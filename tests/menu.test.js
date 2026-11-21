const assert = require('node:assert/strict');
const { existsSync, readFileSync } = require('node:fs');
const { join } = require('node:path');
const { test } = require('node:test');
const vm = require('node:vm');

const directory = join(__dirname, '..');
const app = readFileSync(join(directory, 'app.js'), 'utf8');
const data = readFileSync(join(directory, 'menu-data.js'), 'utf8');

function render({ path = '/index.html', search = '', width = 1920, height = 1080, edit, editDocument } = {}) {
  const stage = { style: {} };
  const events = {};
  const timers = [];
  const timeouts = new Map();
  const classes = new Set();
  const fullscreenButton = {
    hidden: true, textContent: 'Enter fullscreen',
    classList: { add: name => classes.add(name), remove: name => classes.delete(name) },
    addEventListener: (event, callback) => { fullscreenButton[event] = callback; }
  };
  const document = {
    documentElement: { clientWidth: 0, clientHeight: 0 },
    getElementById: id => {
      assert.ok(['stage', 'fullscreen-toggle'].includes(id));
      return id === 'stage' ? stage : fullscreenButton;
    },
    addEventListener: (event, callback) => { events[event] = callback; }
  };
  if (editDocument) editDocument(document);
  let reloads = 0;
  const context = {
    window: {},
    document,
    location: { pathname: path, search, reload: () => reloads++ },
    URLSearchParams, innerWidth: width, innerHeight: height,
    addEventListener: (event, callback) => { events[event] = callback; },
    setTimeout: (callback, delay) => { const id = {}; timeouts.set(id, { callback, delay }); return id; },
    clearTimeout: id => timeouts.delete(id),
    setInterval: (callback, delay) => { timers.push({ callback, delay }); }
  };
  vm.createContext(context);
  vm.runInContext(data, context);
  if (edit) edit(context.window.LAKESIDE_MENU);
  vm.runInContext(app, context);
  return { stage, context, events, timers, timeouts, classes, fullscreenButton, get reloads() { return reloads; } };
}

test('all entry points select the intended TV and its complete menu', () => {
  for (const options of [{}, { path: '/screen1.html' }, { search: '?screen=1' }]) {
    const { stage } = render(options);
    assert.equal(stage.className, 'screen1');
    for (const name of ['Scoop Ice Cream', 'Bubble Waffle Cup', 'Ice Cream Taco', 'Cookie Dough Sundae', 'Big Cookie Sandwich']) {
      assert.ok(stage.innerHTML.includes(name));
    }
  }
  for (const options of [{ path: '/screen2.html' }, { search: '?screen=2' }]) {
    const { stage } = render(options);
    assert.equal(stage.className, 'screen2');
    for (const name of ['Dubai Chocolate Cup', 'Chocolate Strawberry Cup', 'Dubai Ice Cream', 'Milkshakes', 'Hot Chocolate &amp; Sahlab']) {
      assert.ok(stage.innerHTML.includes(name));
    }
    assert.ok(!stage.innerHTML.includes('Bubble Waffle Cup'));
  }
});

test('only confirmed prices appear; new prices can be added through menu data', () => {
  const first = render().stage.innerHTML;
  for (const price of ['$2.99', '+$1.25', '+$2.50']) assert.ok(first.includes(price));
  const second = render({ path: '/screen2.html' }).stage.innerHTML;
  assert.equal((second.match(/\$6\.99/g) || []).length, 5);
  assert.ok(!second.includes('class="footer-price"'));
  assert.ok(!second.includes('null'));
  const confirmed = render({ edit: menu => { menu.screen1.cards[0].price = '$7.50'; } }).stage.innerHTML;
  assert.ok(confirmed.includes('<span class="item-price">$7.50</span>'));
});

test('menu text and image attributes are escaped', () => {
  const html = render({ edit: menu => {
    menu.brand = '<script>alert(1)</script>';
    menu.screen1.cards[0].name = 'Cookies & "cream"';
    menu.screen1.feature.image = 'art.jpg" onerror="alert(1)';
  } }).stage.innerHTML;
  assert.ok(!html.includes('<script>'));
  assert.ok(html.includes('&lt;script&gt;'));
  assert.ok(html.includes('Cookies &amp; &quot;cream&quot;'));
  assert.ok(html.includes('src="art.jpg&quot; onerror=&quot;alert(1)"'));
});

test('the 1080p canvas fits HD, 4K, and other aspect ratios and responds to resize', () => {
  assert.equal(render().stage.style.transform, 'translate(0px,0px) scale(1)');
  assert.equal(render({ width: 3840, height: 2160 }).stage.style.transform, 'translate(0px,0px) scale(2)');
  assert.equal(render({ width: 1280, height: 720 }).stage.style.transform, 'translate(0px,0px) scale(0.6666666666666666)');
  const smaller = render({ width: 1024, height: 768 });
  assert.equal(smaller.stage.style.transform, 'translate(0px,96px) scale(0.5333333333333333)');
  smaller.context.innerWidth = 1920;
  smaller.context.innerHeight = 1080;
  smaller.events.resize();
  assert.equal(smaller.stage.style.transform, 'translate(0px,0px) scale(1)');
});

test('hourly menu refresh is retained', () => {
  const result = render();
  assert.equal(result.timers.length, 1);
  assert.equal(result.timers[0].delay, 3600000);
  result.timers[0].callback();
  assert.equal(result.reloads, 1);
});

test('both TVs use the actual viewport and refit after fullscreen changes', async () => {
  for (const path of ['/screen1.html', '/screen2.html']) {
    let requests = 0;
    const result = render({ path, width: 1920, height: 1080, editDocument: document => {
      document.documentElement.clientWidth = 1536;
      document.documentElement.clientHeight = 864;
      document.documentElement.requestFullscreen = function () {
        assert.equal(this, document.documentElement);
        requests++;
      };
    } });
    assert.equal(result.stage.style.transform, 'translate(0px,0px) scale(0.8)');
    assert.equal(result.fullscreenButton.hidden, false);
    assert.equal(requests, 0, 'fullscreen must wait for a user gesture');
    await result.fullscreenButton.click();
    assert.equal(requests, 1);
    const document = result.context.document;
    document.fullscreenElement = document.documentElement;
    document.documentElement.clientWidth = 1920;
    document.documentElement.clientHeight = 1080;
    result.events.fullscreenchange();
    assert.equal(result.stage.style.transform, 'translate(0px,0px) scale(1)');
    assert.equal(result.fullscreenButton.hidden, true);
    document.fullscreenElement = null;
    document.documentElement.clientHeight = 900;
    result.events.fullscreenchange();
    assert.equal(result.stage.style.transform, 'translate(160px,0px) scale(0.8333333333333334)');
    assert.equal(result.fullscreenButton.hidden, false);
  }
});

test('fullscreen handles unsupported TVs, older WebKit TVs, and rejected requests', async () => {
  const unsupported = render();
  assert.equal(unsupported.fullscreenButton.hidden, true);
  assert.equal(unsupported.timeouts.size, 0);
  let requests = 0;
  const webkit = render({ editDocument: document => {
    document.documentElement.webkitRequestFullscreen = () => { requests++; };
  } });
  await webkit.fullscreenButton.click();
  assert.equal(requests, 1);
  webkit.context.document.webkitFullscreenElement = webkit.context.document.documentElement;
  webkit.events.webkitfullscreenchange();
  assert.equal(webkit.fullscreenButton.hidden, true);
  const rejected = render({ editDocument: document => {
    document.documentElement.requestFullscreen = () => Promise.reject(new Error('Blocked by browser'));
  } });
  await rejected.fullscreenButton.click();
  assert.equal(rejected.fullscreenButton.textContent, 'Retry fullscreen');
  assert.equal(rejected.fullscreenButton.hidden, false);
  assert.ok(rejected.fullscreenButton.title.includes('F11'));
});

test('setup controls hide when idle and return on pointer activity', () => {
  const result = render({ editDocument: document => {
    document.documentElement.requestFullscreen = () => {};
  } });
  assert.ok(result.classes.has('is-visible'));
  const timeout = [...result.timeouts.values()][0];
  assert.equal(timeout.delay, 4000);
  timeout.callback();
  assert.ok(!result.classes.has('is-visible'));
  result.events.pointermove();
  assert.ok(result.classes.has('is-visible'));
  assert.equal(result.timeouts.size, 1, 'pointer activity resets the idle timer');
});

test('every dessert and upgrade has local artwork and entry points load local scripts and styles', () => {
  const { context } = render();
  for (const screen of ['screen1', 'screen2']) {
    const menu = context.window.LAKESIDE_MENU[screen];
    for (const item of [menu.feature, ...menu.cards, ...menu.footer.filter(item => item.price)]) {
      assert.ok(item.image, `Missing artwork for ${item.name}`);
      assert.ok(existsSync(join(directory, item.image)), `Missing ${item.image}`);
      assert.ok(readFileSync(join(directory, item.image)).length > 0);
      const html = render({ path: `/${screen}.html` }).stage.innerHTML;
      assert.ok(html.includes(`src="${item.image}"`));
    }
  }
  for (const file of ['index.html', 'screen1.html', 'screen2.html']) {
    const html = readFileSync(join(directory, file), 'utf8');
    assert.ok(html.includes('href="style.css"'));
    assert.ok(html.includes('src="menu-data.js"'));
    assert.ok(html.includes('src="app.js"'));
  }
});
