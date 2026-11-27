(function () {
  'use strict';

  const menu = window.LAKESIDE_MENU;
  const screen = menu.screen1 ? 'screen1' : 'screen2';
  const data = menu[screen];
  const root = document.getElementById('stage');
  const esc = value => String(value ?? '').replace(/[&<>"']/g, character => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  })[character]);
  const price = (value, className) => value == null || value === ''
    ? '' : `<span class="${className}">${esc(value)}</span>`;

  root.className = screen;
  const header = `
    <header class="topbar">
      <div class="brand">
        <svg class="beacon" width="72" height="72" viewBox="0 0 48 48" aria-hidden="true">
          <path d="M5 38 Q14 32 24 38 T43 38" fill="none" stroke="currentColor" stroke-width="2"/>
          <path d="M16 35 L20 14 H28 L32 35Z" fill="none" stroke="currentColor" stroke-width="2"/>
          <path d="M18 14 V9 H30 V14Z" fill="var(--brick)"/>
          <path d="M23 5 H25 V9 H23Z M22 24 H26 V35 H22Z" fill="currentColor"/>
          <path d="M14 12 L5 8 M34 12 L43 8" stroke="currentColor" stroke-width="2"/>
        </svg>
        <div class="brandname">${esc(menu.brand)}</div>
      </div>
    </header>`;

  function renderFourSections() {
    const { buildYourOwn } = data;
    const recommendedSauces = new Set(buildYourOwn.recommendedSauces);
    const recommendationLabel = esc(buildYourOwn.recommendationLabel);
    const recommendationStar = '<span class="recommendation-star" aria-hidden="true">★</span>';

    return `
    <h1 class="visually-hidden">${esc(data.title)}</h1>
    <main class="menu-quadrants" aria-label="${esc(data.title)}">
      <div class="menu-column left-menu-column">
        <section class="refreshments-section" aria-label="Strawberry cups and Sahlab">
        ${[...data.cups, data.drink].map((item, index) => `
          <article class="refreshment-row" aria-labelledby="refreshment-${index}">
            <div class="refreshment-photo-space photo-backdrop">
              <img class="product-photo refreshment-photo refreshment-photo-${index}" src="${esc(item.image)}" alt="" decoding="async">
            </div>
            <div class="refreshment-copy">
              <div class="option-heading">
                <h2 id="refreshment-${index}">${esc(item.name)}</h2>
                ${item.sticker ? `<span class="menu-sticker winter-sticker">${esc(item.sticker)}</span>` : ''}
                ${price(item.price, index < data.cups.length ? 'cup-price' : 'item-price')}
              </div>
              <p${item === data.drink ? ' class="drink-description"' : ''}>${esc(item.note)}</p>
            </div>
          </article>`).join('')}
        </section>
        <section class="scoops-section" aria-labelledby="scoops-title">
          <h2 id="scoops-title" class="section-title">${esc(data.scoops.name)}</h2>
          <p class="menu-sticker scoop-caption">${esc(data.scoops.caption)}</p>
          <dl class="scoop-prices">${data.scoops.sizes.map(item => `
            <div><dt>${esc(item.name)}</dt><dd>${price(item.price, 'scoop-price')}</dd></div>`).join('')}
          </dl>
          <ul class="scoop-addons">${data.scoops.addons.map(item => `
            <li><span>${esc(item.name)}</span>${price(item.price, 'scoop-addon-price')}</li>`).join('')}
          </ul>
        </section>
      </div>
      <div class="menu-column right-menu-column">
      <section class="waffle-section" aria-labelledby="waffle-title">
        <h2 id="waffle-title" class="section-title">${esc(data.waffles.name)}</h2>
        <div class="waffle-menu">
          <div class="photo-backdrop waffle-photo-space"><img class="product-photo waffle-photo" src="${esc(data.waffles.image)}" alt="" decoding="async"></div>
          <ol class="waffle-options">
            ${data.waffles.options.map(item => `
              <li>
                <div class="option-heading"><h3>${esc(item.name)}</h3>${price(item.price, 'item-price')}</div>
                <p>${esc(item.note)}</p>
              </li>`).join('')}
          </ol>
        </div>
      </section>
      <section class="build-section" aria-labelledby="build-title">
        <div class="option-heading"><h2 id="build-title" class="section-title">${esc(buildYourOwn.name)}</h2>${price(buildYourOwn.price, 'item-price')}</div>
        <div class="customization-lists">
          <div class="sauce-group">
            <h3>${esc(buildYourOwn.sauceHeading)}</h3>
            <ul class="sauce-list">${buildYourOwn.sauces.map(sauce => {
              const recommendation = recommendedSauces.has(sauce)
                ? `&nbsp;${recommendationStar}<span class="visually-hidden"> (${recommendationLabel})</span>`
                : '';
              return `<li>${esc(sauce)}${recommendation}</li>`;
            }).join('')}</ul>
          </div>
          <div class="topping-group">
            <h3>${esc(buildYourOwn.toppingHeading)}</h3>
            <ul>${buildYourOwn.toppings.map(topping => `<li>${esc(topping)}</li>`).join('')}</ul>
          </div>
        </div>
        ${buildYourOwn.sauces.some(sauce => recommendedSauces.has(sauce))
          ? `<p class="recommendation-legend">${recommendationStar} ${recommendationLabel}</p>`
          : ''}
      </section>
      </div>
    </main>`;
  }

  function renderClassicMenu() {
    return `
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
    <footer class="menu-footer" aria-label="More information">
      ${data.footer.map(item => `
        <div class="footer-item">${item.image ? `<img class="footer-art dessert-wobble" src="${esc(item.image)}" width="64" height="64" alt="" decoding="async">` : ''}<span>${esc(item.name)}</span>${price(item.price, 'footer-price')}</div>
      `).join('')}
    </footer>
    `;
  }

  root.innerHTML = header + (screen === 'screen1' ? renderFourSections() : renderClassicMenu());

  function scale() {
    const width = document.documentElement.clientWidth || innerWidth;
    const height = document.documentElement.clientHeight || innerHeight;
    const ratio = Math.min(width / 1920, height / 1080);
    const x = Math.max(0, (width - 1920 * ratio) / 2);
    const y = Math.max(0, (height - 1080 * ratio) / 2);
    root.style.transform = `translate(${x}px,${y}px) scale(${ratio})`;
  }

  const fullscreenButton = document.getElementById('fullscreen-toggle');
  const display = document.documentElement;
  const requestFullscreen = display.requestFullscreen || display.webkitRequestFullscreen;
  let hideControls;

  function showControls() {
    clearTimeout(hideControls);
    fullscreenButton.classList.add('is-visible');
    hideControls = setTimeout(() => fullscreenButton.classList.remove('is-visible'), 4000);
  }

  function updateFullscreen() {
    fullscreenButton.hidden = !requestFullscreen || !!(document.fullscreenElement || document.webkitFullscreenElement);
    if (!fullscreenButton.hidden) {
      fullscreenButton.focus?.();
      showControls();
    }
    scale();
  }

  fullscreenButton.addEventListener('click', async () => {
    try {
      // Fullscreen must be requested from a user gesture, such as a click or remote selection.
      await requestFullscreen.call(display);
    } catch (error) {
      fullscreenButton.textContent = 'Retry fullscreen';
      fullscreenButton.title = 'Use the browser fullscreen option or F11 if fullscreen is blocked.';
      showControls();
    }
  });
  if (requestFullscreen) {
    addEventListener('pointermove', showControls);
    addEventListener('pointerdown', showControls);
  }
  document.addEventListener('fullscreenchange', updateFullscreen);
  document.addEventListener('webkitfullscreenchange', updateFullscreen);
  addEventListener('resize', scale);
  updateFullscreen();
  setInterval(() => location.reload(), 60 * 60 * 1000);
})();
