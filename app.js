(function () {
  'use strict';

  const params = new URLSearchParams(location.search);
  const screen = params.get('screen') === '2' || location.pathname.endsWith('/screen2.html')
    ? 'screen2' : 'screen1';
  const menu = window.LAKESIDE_MENU;
  const data = menu[screen];
  const root = document.getElementById('stage');
  const esc = value => String(value ?? '').replace(/[&<>"']/g, character => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  })[character]);
  const price = (value, className) => value == null || value === ''
    ? '' : `<span class="${className}">${esc(value)}</span>`;

  root.className = screen;
  root.innerHTML = `
    <header class="topbar">
      <div class="brand">
        <svg class="beacon" width="72" height="72" viewBox="0 0 48 48" aria-hidden="true">
          <path d="M5 38 Q14 32 24 38 T43 38" fill="none" stroke="currentColor" stroke-width="2"/>
          <path d="M16 35 L20 14 H28 L32 35Z" fill="none" stroke="currentColor" stroke-width="2"/>
          <path d="M18 14 V9 H30 V14Z" fill="#C45E43"/>
          <path d="M23 5 H25 V9 H23Z M22 24 H26 V35 H22Z" fill="currentColor"/>
          <path d="M14 12 L5 8 M34 12 L43 8" stroke="currentColor" stroke-width="2"/>
        </svg>
        <div class="brandname">${esc(menu.brand)}</div>
      </div>
      <div class="brandsub">${esc(menu.subtitle)}</div>
    </header>
    <h1 class="menu-heading">${esc(data.title)} <span>${esc(data.emphasis)}</span></h1>
    <main class="content" aria-label="${esc(data.title)} ${esc(data.emphasis)}">
      <article class="feature" aria-labelledby="feature-name">
        <div class="feature-copy">
          <h2 id="feature-name">${esc(data.feature.name)}</h2>
          <p>${esc(data.feature.note)}</p>
        </div>
        <div class="feature-art">
          <img src="${esc(data.feature.image)}" width="640" height="640" alt="" decoding="async">
        </div>
        ${price(data.feature.price, 'feature-price')}
      </article>
      <div class="menu-list">
        ${data.cards.map(item => `
          <article class="menu-item">
            <img class="item-art dessert-wobble" src="${esc(item.image)}" width="120" height="120" alt="" decoding="async">
            <div class="item-copy">
            <div class="item-heading">
              <h2>${esc(item.name)}</h2>
              ${price(item.price, 'item-price')}
            </div>
            <p>${esc(item.note)}</p>
            </div>
          </article>
        `).join('')}
      </div>
    </main>
    <footer class="menu-footer" aria-label="${screen === 'screen1' ? 'Cone and bowl upgrades' : 'More information'}">
      ${data.footer.map(item => `
        <div class="footer-item">${item.image ? `<img class="footer-art dessert-wobble" src="${esc(item.image)}" width="64" height="64" alt="" decoding="async">` : ''}<span>${esc(item.name)}</span>${price(item.price, 'footer-price')}</div>
      `).join('')}
    </footer>
  `;

  function scale() {
    const ratio = Math.min(innerWidth / 1920, innerHeight / 1080);
    const x = Math.max(0, (innerWidth - 1920 * ratio) / 2);
    const y = Math.max(0, (innerHeight - 1080 * ratio) / 2);
    root.style.transform = `translate(${x}px,${y}px) scale(${ratio})`;
  }

  addEventListener('resize', scale);
  scale();
  setInterval(() => location.reload(), 60 * 60 * 1000);
})();
