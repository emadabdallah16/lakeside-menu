# Lakeside Dessert TV Menu

Two independent 1920 × 1080 landscape menu pages for Lakeside Convenience.

- TV 1: https://emadabdallah16.github.io/lakeside-menu/screen1.html
- TV 2: https://emadabdallah16.github.io/lakeside-menu/screen2.html

## Enable GitHub Pages
In this repository go to **Settings → Pages → Build and deployment**. Select **Deploy from a branch**, **main**, **/(root)**, then **Save**. URLs work after Pages deployment.

## Edit your menu
Edit `menu-data.js` in GitHub and commit changes. Prices set to `null` are deliberately hidden until confirmed. The TVs automatically reload once an hour, or you can reload their browsers.

## Display
For each 49-inch TV, set the display or HDMI output to **1920 × 1080, landscape**, set browser zoom to **100%**, and open the corresponding screen URL. Select **Enter fullscreen** with a mouse, keyboard, or TV remote. The setup button hides after four seconds and reappears when you move the pointer, tap the page, or focus it with Tab. It stays hidden during fullscreen; press Escape to leave fullscreen.

If the TV browser does not support the Fullscreen API, use its built-in fullscreen option, or F11 on a connected computer. Browser security requires a user action to enter fullscreen, so the page cannot automatically remove browser chrome on load. For unattended startup, configure the connected device's browser in kiosk mode with the appropriate screen URL. Test each TV's sleep settings and hourly reload in that mode.

Set the TV picture size to **Screen Fit**, **Just Scan**, or **1:1** (the name varies by TV) to avoid overscan cropping. The physical 49-inch size does not change the layout: at 1920 × 1080, the menu fills the viewport at its native scale. Smaller or larger 16:9 viewports scale proportionally; other aspect ratios center the complete menu with margins so nothing is stretched or cut off. Scaling recalculates on window resize and fullscreen changes.

## Retro Parlour design

See [AGENTS.md](AGENTS.md) for the shared design criteria and guidance for future changes.

Both TVs use the selected Retro Parlour direction: paper-yellow `#E8E0C0`, deep blue ink `#12364A`, dark brick prices `#782E24`, ochre price labels `#E4AC55` with dark brown text `#38251B`, large italic serif headings, and slightly tilted printed panels. The feature panel uses light warm `#DED1AC`; seafoam `#397A73` is reserved for decoration. Subtle halftone dots finish the feature artwork; the menu list stays clear of texture. System fonts (Times New Roman, Helvetica/Arial, Courier New) keep the menus independent of font services. The lighthouse is a simplified motif rather than the official logo.

The TV palette targets at least 7:1 computed sRGB contrast for all menu text and prices: approximately 9.6:1 for blue on paper, 8.4:1 for blue on the feature panel, 7.16:1 for brick prices on paper, and 7.13:1 for dark brown on ochre. This uses the [W3C enhanced contrast guidance](https://www.w3.org/WAI/WCAG22/Understanding/contrast-enhanced.html) as a design target. The heading's colored offsets are limited to one pixel on each side for a quieter printed edge. The original paper background is retained to match the illustrations. Verify the result on the actual TVs under store lighting; computed contrast does not account for display calibration, glare, or viewing distance.

The local images in `assets/` are AI-generated dessert placeholders, not photographs of the store's servings. Every dessert and cone/bowl upgrade has its own illustration. See `assets/README.md` for provenance and prompts. Replace the image paths in `menu-data.js` to use different artwork. Images are decorative because the adjacent item names and descriptions provide the menu information.

The layout is composed at 1920 × 1080 and scales as a complete canvas, preserving the menu's arrangement on landscape TVs. Dessert illustrations rock gently by two degrees on a seven-second loop with staggered timing. Animation is disabled when the browser requests reduced motion. The canvas centers on screens with a different aspect ratio. All listed items and confirmed prices are retained; unconfirmed prices and promotional badges are omitted.

## Local preview and checks

From this directory, run `python -m http.server 8000 --bind 127.0.0.1` and open `http://127.0.0.1:8000/screen1.html` or `http://127.0.0.1:8000/screen2.html`. `index.html` defaults to TV 1; `index.html?screen=2` displays TV 2.

Run `node --test tests/menu.test.js` for checks covering screen selection, confirmed and hidden prices, safe text rendering, assets, viewport scaling, fullscreen changes and fallbacks, setup controls, and hourly refresh. No package installation is required.

No API keys, external data, or paid subscriptions required.
