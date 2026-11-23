# Lakeside Dessert TV Menu

Two independent 1920 × 1080 landscape menu pages for Lakeside Convenience.

- TV 1: https://emadabdallah16.github.io/lakeside-menu/screen1.html
- TV 2: https://emadabdallah16.github.io/lakeside-menu/screen2.html

## Enable GitHub Pages
In this repository go to **Settings → Pages → Build and deployment**. Select **Deploy from a branch**, **main**, **/(root)**, then **Save**. URLs work after Pages deployment.

## Edit your menu
Edit `menu-data.js` in GitHub and commit changes. Prices set to `null` are deliberately hidden until confirmed. The TVs automatically reload once an hour, or you can reload their browsers.

TV 1 has four sections: both strawberry cups and Sahlab stacked as three rows at top left, Scoop Ice Cream in approximately the bottom 30% of the left column, three waffle-stick options at top right, and build-your-own sauces and toppings below. Edit `screen1.cups`, `screen1.drink`, `screen1.scoops`, `screen1.waffles.options`, and `screen1.buildYourOwn` in the menu data. The Belgian strawberry cup is **$9**, the Dubai strawberry cup **$13**, and Sahlab **$4**. Belgian and Biscoff waffle sticks are **$6**, Dubai Chocolate **$7**, and Build Your Own **$7.50**. Scoops cost **$2.99 / $3.99 / $6.99 / $8.99** for kids / one / two / three scoops, with waffle cone **+$1.50**, fudge **+$1.00**, and up to three toppings **+$1.50**. TV 2 retains its existing menu and `feature`, `cards`, and `footer` data structure.

## Display
For each 49-inch TV, set the display or HDMI output to **1920 × 1080, landscape**, set browser zoom to **100%**, and open the corresponding screen URL. Select **Enter fullscreen** with a mouse, keyboard, or TV remote. The setup button hides after four seconds and reappears when you move the pointer, tap the page, or focus it with Tab. It stays hidden during fullscreen; press Escape to leave fullscreen.

If the TV browser does not support the Fullscreen API, use its built-in fullscreen option, or F11 on a connected computer. Browser security requires a user action to enter fullscreen, so the page cannot automatically remove browser chrome on load. For unattended startup, configure the connected device's browser in kiosk mode with the appropriate screen URL. Test each TV's sleep settings and hourly reload in that mode.

Set the TV picture size to **Screen Fit**, **Just Scan**, or **1:1** (the name varies by TV) to avoid overscan cropping. The physical 49-inch size does not change the layout: at 1920 × 1080, the menu fills the viewport at its native scale. Smaller or larger 16:9 viewports scale proportionally; other aspect ratios center the complete menu with margins so nothing is stretched or cut off. Scaling recalculates on window resize and fullscreen changes.

## Retro Parlour design

See [AGENTS.md](AGENTS.md) for the shared design criteria and guidance for future changes.

Both TVs use the selected Retro Parlour direction: paper-yellow `#E8E0C0`, deep blue ink `#12364A`, dark brick prices `#782E24`, ochre price labels `#E4AC55` with dark brown text `#38251B`, large italic serif headings, and slightly tilted printed panels. The feature panel uses light warm `#DED1AC`; seafoam `#397A73` is reserved for decoration. Subtle halftone dots finish the feature artwork; the menu list stays clear of texture. System fonts (Times New Roman, Helvetica/Arial, Courier New) keep the menus independent of font services. The lighthouse is a simplified motif rather than the official logo.

The TV palette targets at least 7:1 computed sRGB contrast for all menu text and prices: approximately 9.6:1 for blue on paper, 8.4:1 for blue on the feature panel, 7.16:1 for brick prices on paper, and 7.13:1 for dark brown on ochre. This uses the [W3C enhanced contrast guidance](https://www.w3.org/WAI/WCAG22/Understanding/contrast-enhanced.html) as a design target. The heading's colored offsets are limited to one pixel on each side for a quieter printed edge. The original paper background is retained to match the illustrations. Verify the result on the actual TVs under store lighting; computed contrast does not account for display calibration, glare, or viewing distance.

TV 1 uses the four user-supplied photo cutouts in `assets/`: Belgian chocolate strawberry cup, Dubai chocolate strawberry cup, Sahlab, and waffle stick. Each cup/drink photo sits beside its name, description, and confirmed price in a dedicated row; the waffle photo sits left of the three named options. These photos use natural colors without multiply blending or halftone overlays. TV 2 retains its AI-generated illustrative placeholders, not photographs of the store's servings. See `assets/README.md` for all image provenance, AI edits, and prompts. Replace image paths in `menu-data.js` to use different artwork. Images are decorative because adjacent text provides the menu information.

The layout is composed at 1920 × 1080 and scales as a complete canvas, preserving each menu's arrangement on landscape TVs. Both TVs show **Lakeside Convenience** higher in the brand bar, with no top-right subtitle. TV 1 uses italic serif section and product names, bold sans-serif waffle options, and monospace descriptions and choices. Its left column uses a 70/30 split with a gap: three cup/drink rows above a compact tilted scoop panel. The **Best-Priced Scoops in Sylvan Lake!** caption floats above that panel as a stationary ochre label. A smaller **Perfect for Winter!** sticker sits beside the Sahlab name. Ochre and seafoam oval backdrops with offset halftone dots sit behind the four photos, leaving menu copy on solid backgrounds. The photos wobble gently by 1.2 degrees on a staggered ten-second loop. TV 2 retains the large heading, feature panel, four illustrated rows, and footer; its dessert illustrations rock by two degrees on a seven-second loop. All artwork animation is disabled when the browser requests reduced motion. The canvas centers on screens with a different aspect ratio. Unconfirmed prices are omitted.

All small descriptions, sauce/topping choices, footer copy, and scoop add-on names
use **bold (700)** text on both TVs for distance readability. Build-your-own waffle
headings read **Sauces** and **Toppings**; the scoop topping add-on keeps its own
quantity wording. Keep the existing font families and sizes when editing copy.

## Local preview and checks

From this directory, run `python -m http.server 8000 --bind 127.0.0.1` and open `http://127.0.0.1:8000/screen1.html` or `http://127.0.0.1:8000/screen2.html`. `index.html` defaults to TV 1; `index.html?screen=2` displays TV 2.

Run `node --test tests/menu.test.js` for checks covering screen selection, confirmed and hidden prices, safe text rendering, assets, viewport scaling, fullscreen changes and fallbacks, setup controls, and hourly refresh. No package installation is required.

## Export a high-resolution PNG

The optional exporter uses [Playwright](https://playwright.dev/python/docs/screenshots)
to render the actual local menu directly to a lossless PNG. It starts and stops its
own loopback server, waits for fonts and every image to decode, hides setup controls,
and freezes artwork animation. Text is rendered at the requested resolution;
there is no JPEG conversion or enlargement of a smaller screenshot. The static
website does not need these tools.

One-time setup on Windows (Python 3.9+):

```powershell
python -m venv .venv-export
.\.venv-export\Scripts\python.exe -m pip install -r requirements-export.txt
.\.venv-export\Scripts\python.exe -m playwright install chromium
```

Export TV 1 at **3840 × 2160**:

```powershell
.\.venv-export\Scripts\python.exe export_menu.py
```

Export both TVs at **7680 × 4320**:

```powershell
.\.venv-export\Scripts\python.exe export_menu.py --screen all --resolution 8k
```

Files are saved in `output/`, for example `output/lakeside-menu-screen1-4k.png`.
Use `--screen 2` for TV 2, `--resolution 1080p` for 1920 × 1080,
or `--output-dir "C:\Menus"` to choose a destination. Re-running replaces matching
exports only after successful rendering. The script works from another directory
when invoked with its full path. For an installed Chrome or Edge browser, use
`--browser chrome` or `--browser msedge` instead of installing bundled Chromium.
On macOS/Linux, use `.venv-export/bin/python` in the commands above.
System font availability can affect appearance across operating systems; use the
same Windows computer for consistent output. Export dimensions do not add detail
to the source photos.

No API keys, external data, or paid subscriptions required.
