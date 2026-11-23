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
    for (const name of ['Belgian Chocolate Strawberry Cup', 'Dubai Chocolate Strawberry Cup', 'Sahlab', 'Scoop Ice Cream', 'Waffle Sticks', 'Build-Your-Own Waffle Stick']) {
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
  assert.equal((first.match(/\$6\.99/g) || []).length, 1, 'only the two-scoop serving uses $6.99');
  for (const amount of ['$9', '$13']) assert.ok(first.includes(`<span class="cup-price">${amount}</span>`));
  for (const amount of ['$4', '$7', '$7.5']) assert.ok(first.includes(`<span class="item-price">${amount}</span>`));
  assert.equal((first.match(/<span class="item-price">\$6<\/span>/g) || []).length, 2);
  assert.equal((first.match(/class="item-price"/g) || []).length, 5);
  assert.ok(first.includes('Lakeside Convenience'));
  assert.ok(!first.includes('brandsub'));
  assert.ok(!first.includes('CONVENIENCE / DESSERT BAR'));
  assert.ok(!first.includes('null'));
  const second = render({ path: '/screen2.html' }).stage.innerHTML;
  assert.equal((second.match(/\$6\.99/g) || []).length, 5);
  assert.ok(!second.includes('class="footer-price"'));
  assert.ok(!second.includes('null'));
  const confirmed = render({ edit: menu => {
    menu.screen1.cups[0].price = null;
    menu.screen1.drink.price = '$4.50';
    menu.screen1.waffles.options[0].price = '$7.50';
    menu.screen1.waffles.options[1].price = '';
    menu.screen1.waffles.options[2].price = null;
    menu.screen1.buildYourOwn.price = '$8.50';
  } }).stage.innerHTML;
  for (const amount of ['$4.50', '$7.50', '$8.50']) assert.ok(confirmed.includes(`<span class="item-price">${amount}</span>`));
  assert.equal((confirmed.match(/class="cup-price"/g) || []).length, 1);
  assert.equal((confirmed.match(/class="item-price"/g) || []).length, 3);
});

test('menu text and image attributes are escaped', () => {
  const html = render({ edit: menu => {
    menu.brand = '<script>alert(1)</script>';
    menu.screen1.cups[0].name = 'Cookies & "cream"';
    menu.screen1.cups[0].image = 'art.jpg" onerror="alert(1)';
    menu.screen1.waffles.options[0].note = '<img src=x onerror=alert(1)>';
    menu.screen1.buildYourOwn.sauces[0] = '<script>sauce</script>';
  } }).stage.innerHTML;
  assert.ok(!html.includes('<script>'));
  assert.ok(html.includes('&lt;script&gt;'));
  assert.ok(html.includes('Cookies &amp; &quot;cream&quot;'));
  assert.ok(html.includes('src="art.jpg&quot; onerror=&quot;alert(1)"'));
  assert.ok(html.includes('&lt;img src=x onerror=alert(1)&gt;'));
  assert.ok(html.includes('&lt;script&gt;sauce&lt;/script&gt;'));
});

test('screen 1 renders four sections with the complete waffle and customization menu', () => {
  const { stage } = render();
  const html = stage.innerHTML;
  assert.equal((html.match(/<section /g) || []).length, 4);
  assert.equal((html.match(/<img /g) || []).length, 4, 'two cups, one drink, and one shared waffle photo');
  for (const name of ['Belgian', 'Biscoff', 'Dubai Chocolate', 'Belgian Milk Chocolate, Oreo Crumb, White Drizzle', 'Biscoff Sauce, Biscoff Crumb, White Drizzle', 'Belgian Milk Chocolate, Pistachio sauce, Kataifi, Crushed Pistachios']) {
    assert.ok(html.includes(name), `Missing waffle option or description: ${name}`);
  }
  const sauces = ['Milk Chocolate', 'White Chocolate', 'Nutella', 'Dark Chocolate', 'Pistachio', 'Biscoff', 'Caramel', 'Maple Syrup', 'Strawberry'];
  const toppings = ['Oreo Crumb', 'Biscoff Crumb', 'Pistachio', 'Marshmallow', 'M&amp;Ms', 'Sprinkles'];
  for (const choice of [...sauces, ...toppings]) assert.ok(html.includes(`<li>${choice}</li>`), `Missing choice: ${choice}`);
  assert.ok(html.includes('<h3>Sauces</h3>'));
  assert.ok(html.includes('<h3>Toppings</h3>'));
  assert.ok(html.includes('Scoop Ice Cream'));
  assert.ok(!html.includes('Waffle cone upgrade'));
});

test('scoops include all confirmed serving sizes, add-ons, and the requested caption', () => {
  const html = render().stage.innerHTML;
  const sizes = Array.from(html.matchAll(/<dt>([^<]+)<\/dt><dd><span class="scoop-price">([^<]+)<\/span><\/dd>/g),
    ([, label, amount]) => [label, amount]);
  assert.deepEqual(sizes, [
    ['Kids Scoop', '$2.99'],
    ['1 scoop', '$3.99'],
    ['2 scoops', '$6.99'],
    ['3 scoops', '$8.99']
  ]);
  for (const [label, amount] of [['Waffle cone', '+$1.5'], ['Fudge', '+$1'], ['Toppings (up to 3)', '+$1.5']]) {
    assert.ok(html.includes(`<span>${label}</span><span class="scoop-addon-price">${amount}</span>`));
  }
  assert.ok(html.includes('Best-Priced Scoops in Sylvan!'));
  assert.equal((html.match(/class="refreshment-row"/g) || []).length, 3);
  assert.ok(!render({path:'/screen2.html'}).stage.innerHTML.includes('scoops-section'));
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

test('all product photos and classic illustrations are local and entry points load local scripts and styles', () => {
  const { context } = render();
  for (const screen of ['screen1', 'screen2']) {
    const menu = context.window.LAKESIDE_MENU[screen];
    const products = screen === 'screen1'
      ? [...menu.cups, menu.drink, menu.waffles]
      : [menu.feature, ...menu.cards, ...menu.footer.filter(item => item.price)];
    for (const item of products) {
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
