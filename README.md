# Lakeside Dessert TV Menu

Two independent 1920 × 1080 landscape menu pages for Lakeside Convenience.

- TV 1: https://emadabdallah16.github.io/lakeside-menu/screen1.html
- TV 2: https://emadabdallah16.github.io/lakeside-menu/screen2.html

## Enable GitHub Pages
In this repository go to **Settings → Pages → Build and deployment**. Select **Deploy from a branch**, **main**, **/(root)**, then **Save**. URLs work after Pages deployment.

## Edit your menu
Edit `menu-data.js` in GitHub and commit changes. Prices set to `null` are deliberately hidden until confirmed. The TVs automatically reload once an hour, or you can reload their browsers.

## Display
Open one URL in each smart TV's browser and use fullscreen if available. Test each TV's web-browser compatibility, sleep settings, and auto reload. An HDMI device with kiosk mode is an option if the built-in browser stops displaying.

## Retro Parlour design

Both TVs use the selected Retro Parlour direction: paper-yellow `#E8E0C0`, blue ink `#174A69`, ochre price labels, large italic serif headings, and slightly tilted printed panels. Subtle halftone dots finish the feature artwork; the menu list stays clear of texture. System fonts (Times New Roman, Helvetica/Arial, Courier New) keep the menus independent of font services. The lighthouse is a simplified motif rather than the official logo.

The local images in `assets/` are AI-generated dessert placeholders, not photographs of the store's servings. Every dessert and cone/bowl upgrade has its own illustration. See `assets/README.md` for provenance and prompts. Replace the image paths in `menu-data.js` to use different artwork. Images are decorative because the adjacent item names and descriptions provide the menu information.

The layout is composed at 1920 × 1080 and scales as a complete canvas, preserving the menu's arrangement on landscape TVs. Dessert illustrations rock gently by two degrees on a seven-second loop with staggered timing. Animation is disabled when the browser requests reduced motion. The canvas centers on screens with a different aspect ratio. All listed items and confirmed prices are retained; unconfirmed prices and promotional badges are omitted.

## Local preview and checks

From this directory, run `python -m http.server 8000 --bind 127.0.0.1` and open `http://127.0.0.1:8000/screen1.html` or `http://127.0.0.1:8000/screen2.html`. `index.html` defaults to TV 1; `index.html?screen=2` displays TV 2.

Run `node --test tests/menu.test.js` for checks covering screen selection, confirmed and hidden prices, safe text rendering, assets, scaling, and hourly refresh. No package installation is required.

No API keys, external data, or paid subscriptions required.
