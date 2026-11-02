const assert = require('node:assert/strict');
const { existsSync, readFileSync } = require('node:fs');
const { join } = require('node:path');
const { test } = require('node:test');
const vm = require('node:vm');

const directory = join(__dirname, '..');
const app = readFileSync(join(directory, 'app.js'), 'utf8');
const data = readFileSync(join(directory, 'menu-data.js'), 'utf8');

function render({ path = '/index.html', search = '', width = 1920, height = 1080, edit } = {}) {
  const stage = { style: {} };
  const events = {};
  const timers = [];
  let reloads = 0;
  const context = {
    window: {},
    document: { getElementById: id => { assert.equal(id, 'stage'); return stage; } },
    location: { pathname: path, search, reload: () => reloads++ },
    URLSearchParams, innerWidth: width, innerHeight: height,
    addEventListener: (event, callback) => { events[event] = callback; },
    setInterval: (callback, delay) => { timers.push({ callback, delay }); }
  };
  vm.createContext(context);
  vm.runInContext(data, context);
  if (edit) edit(context.window.LAKESIDE_MENU);
  vm.runInContext(app, context);
  return { stage, context, events, timers, get reloads() { return reloads; } };
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
  for (const type of ['feature-price', 'item-price', 'footer-price']) {
    assert.ok(!second.includes(`class="${type}"`));
  }
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

test('both feature assets exist locally and entry points load local scripts and styles', () => {
  const { context } = render();
  for (const screen of ['screen1', 'screen2']) {
    const image = context.window.LAKESIDE_MENU[screen].feature.image;
    assert.ok(existsSync(join(directory, image)), `Missing ${image}`);
    assert.ok(readFileSync(join(directory, image)).length > 0);
  }
  for (const file of ['index.html', 'screen1.html', 'screen2.html']) {
    const html = readFileSync(join(directory, file), 'utf8');
    assert.ok(html.includes('href="style.css"'));
    assert.ok(html.includes('src="menu-data.js"'));
    assert.ok(html.includes('src="app.js"'));
  }
});
