# Menu design guidance

These instructions apply to the entire repository and to all future menu changes.
Preserve the established **Retro Parlour** design unless the user explicitly requests
a different direction. Apply requested design-system changes consistently across
both TVs and update this file and the design notes in `README.md` in the same change.
Routine content edits should use the existing design without restyling components.

## Project structure

- `style.css` owns the shared palette, typography, components, and layout.
- `app.js` renders both menus and handles viewport scaling and fullscreen controls.
- `screen1-data.js` or `screen2-data.js` owns menu names, descriptions, prices, and artwork paths.
  Screen 1 uses `cups`, `drink`, `scoops` (sizes, add-ons, and caption),
  `waffles.options`, and `buildYourOwn` (sauces and toppings); screen 2 uses
  `feature`, `cards`, and `footer`.
- `screen1.html` and `screen2.html` are the TV entry points. `index.html` opens the chooser
  and supports `?screen=2`.
- `assets/README.md` records illustration provenance and prompts.
- `export_menu.py` produces still PNGs with optional Python/Playwright tooling;
  keep export dependencies in `requirements-export.txt`, outside the static site's runtime.

Keep the site static and self-contained. Retain local assets and system fonts;
do not add remote font services or runtime dependencies for routine design changes.

## Visual direction

Use a warm, printed ice-cream-parlour aesthetic: paper-yellow backgrounds, blue ink,
bold typography, restrained tilted panels, illustrated desserts, and subtle halftone
texture. Both TVs must look like parts of the same menu system. Reuse shared classes
and tokens instead of introducing screen-specific variations without a content need.
Avoid unrelated gradients, glossy effects, rounded dashboard cards, extra badges,
and decorative elements that compete with menu names or prices.

## Color palette

Use the existing CSS custom properties for new styles. Do not introduce near-duplicate
colors or a new accent palette as part of an ordinary menu edit.

| Token | Value | Role |
| --- | --- | --- |
| `--paper` | `#E8E0C0` | Page and canvas background |
| `--ink` | `#12364A` | Deep blue primary text, rules, and line art |
| `--panel` | `#DED1AC` | Light warm feature panel background |
| `--brick` | `#782E24` | Dark brick item prices and restrained accents |
| `--seafoam` | `#397A73` | Secondary decorative accent; not menu text |
| `--ochre` | `#E4AC55` | Feature price label background |
| `--price-ink` | `#38251B` | Dark brown feature price text |
| `--rule` | `#12364A70` | Translucent blue dashed item dividers |

Use `--price-ink` on `--ochre` for the feature price and `--rule` for dashed item
dividers. Keep these supporting treatments consistent, including SVG accents.
Keep menu copy on solid backgrounds; texture belongs on artwork. Preserve readable
contrast, and do not use an accent color as the sole way to convey information.
Target at least **7:1** computed sRGB contrast for all menu text and prices on
their actual backgrounds, even large text. Current pairs are approximately 9.6:1
for ink on paper, 8.4:1 for ink on the feature panel, 7.16:1 for brick on paper,
and 7.13:1 for price ink on ochre. These are design targets, not a guarantee of
readability on a particular TV; check the physical display under store lighting.
Keep the paper background aligned with existing artwork. Prefer darker text to
brightening the whole canvas, and reserve seafoam for decoration.
If an intentional palette change affects the page background, also update the
`theme-color` metadata in all three HTML entry points.

## Typography

Preserve these font stacks and roles. Sizes below are CSS pixels on the native
1920 × 1080 canvas, before viewport scaling.

| Role | Font stack | Existing treatment |
| --- | --- | --- |
| Brand name | `'Times New Roman', Times, serif` | Bold italic, 84px, line-height .95, tracking -4px |
| Screen 2 main menu heading | `'Times New Roman', Times, serif` | Bold italic, 132px, line-height 1.1, tracking -6px |
| Feature name | `'Times New Roman', Times, serif` | Bold italic, 52px, line-height 1.15, tracking -1.5px |
| Menu item name | `Helvetica, Arial, sans-serif` | Bold, 48px, line-height 1.08, tracking -1.5px |
| Feature description | `'Courier New', Courier, monospace` | Bold, 24px, line-height 1.3 |
| Item description | `'Courier New', Courier, monospace` | Bold, 28px, line-height 1.3 |
| Footer | `'Courier New', Courier, monospace` | Bold, 28px, line-height 1.2 |
| Item price | `'Times New Roman', Times, serif` | Bold, 44px, line-height 1 |
| Feature price | `'Times New Roman', Times, serif` | Bold, 88px, line-height 1, tracking -5px |
| Screen 1 section heading | `'Times New Roman', Times, serif` | Bold italic, 56px, line-height 1.1, tracking -1.5px |
| Screen 1 cup, drink, and waffle option names | `'Times New Roman', Times, serif` | Bold italic, 48px, line-height 1.04, tracking -1px |
| Screen 1 descriptions and choices | `'Courier New', Courier, monospace` | Bold, 26px, with the Sahlab description at 24px to fit two lines |
| Screen 1 prices | `'Times New Roman', Times, serif` | Bold, 48px, brick on paper |
| Scoop panel heading | `'Times New Roman', Times, serif` | Bold italic, 52px |
| Scoop sizes and add-ons | `Helvetica, Arial, sans-serif` | Bold 26px sizes; bold 24px add-on names |
| Scoop prices | `'Times New Roman', Times, serif` | Bold 44px sizes; 32px add-ons; blue on panel |
| Scoop caption and Sahlab sticker | `Helvetica, Arial, sans-serif` | Bold 24px, dark brown on ochre |

All small menu descriptions, choices, footer copy, and add-on names use weight 700
for TV-distance readability. Use **Sauces (Up to 2 + 1 Drizzle)** and
**Toppings (Up to 3)** for waffle customization. Mark recommended sauces with a
brick-red star to the right of the name and explain the star in the legend below the sauce list.
The default body font is `Helvetica, Arial, sans-serif`. Setup controls use the same
sans-serif stack at bold 18px. Preserve the heading's subtle brick/seafoam offset
text shadow at only +/-1px on the native canvas to limit colored fringes.
Do not substitute a new font or reduce type sizes to squeeze in more
content. First refine spacing or line breaks while preserving the item's meaning;
make necessary typography adjustments at the shared component level and check both TVs.

## Layout and component patterns

- Compose at **1920 × 1080 landscape**. Scale the complete canvas proportionally
  using `app.js`; center it with margins at other aspect ratios. Keep every item
  visible without scrolling, stretching, or cropping.
- Screen 1 uses a brand bar and **four sections**: both strawberry cups and Sahlab
  stacked as three photo rows at top left, Ice Cream at bottom left, the
  waffle photo beside three named options at top right, and Build-Your-Own Waffle
  Stick at bottom right. Each cup/drink row has its photo on the left, name and
  price on a shared heading line, and description below. Keep every sauce and topping visible.
  Baseline: 28px vertical / 44px horizontal canvas padding, an 80px brand bar,
  20px header gap, an 824px left column, and a 48px column gap. Columns have
  independent rows: left 7:3 (about 70% refreshments / 30% scoops), right 490px
  for waffle options and the remaining space for Build Your Own. Both use a 28px
  row gap. Sauces use two text columns; toppings use one.
- Both TVs display **Lakeside Convenience** as the brand, with the brand bar
  shifted upward 12px. Do not reintroduce the former top-right subtitle.
- Screen 2 retains the brand bar, large menu heading, left feature panel,
  four-row right menu list, and footer. If content requires a different count,
  deliberately adapt and verify the layout; the classic list grid assumes four rows.
- Screen 2 spacing baseline: canvas padding 64px vertically and
  80px horizontally, 32px between major rows, a 600px feature column, and an 80px
  gap between content columns. Keep generous whitespace and TV-distance readability.
- Keep item names and prices aligned on a shared heading row, descriptions below,
  and illustrations beside the copy. Prices must remain fully visible and unbroken.
  Allow long names to wrap without colliding with adjacent rows or artwork.
- Screen 2 printed tilt pattern: brand bar, heading, and footer at -2 degrees;
  feature panel at -3 degrees; menu list at +2 degrees; feature price label at
  +5 degrees. Check transformed edges for clipping.
- Screen 1 keeps the brand bar and waffle heading at -2 degrees and the scoop
  panel at -1 degree; the denser product copy and choice lists remain level.
- The **Best-Priced Scoops in Sylvan Lake!** caption floats visually
  above the scoop panel's upper-right edge, at a 4-degree tilt. Keep it stationary,
  readable, and clear of product copy, prices, and the adjacent sections.
- The **Perfect for Winter!** sticker sits beside the Sahlab name, using the
  same ochre treatment as the scoop caption.
- Retain dashed item dividers and the double-rule footer. Add new elements by
  extending these patterns rather than inventing a separate card or label system.
- Keep fullscreen setup controls outside the scaled canvas, keyboard accessible,
  and hidden when idle or in fullscreen, as currently implemented.

## Artwork and motion

Use local dessert illustrations with navy outlines, warm natural dessert colors,
ochre details, and subtle printed shading. Match the paper background or use
compatible transparency. Keep the entire dessert visible with `object-fit: contain`.
Screen 1 uses the four user-supplied, AI-edited transparent product photos in
`assets/`: the two strawberry cups, `sahlab.png`, and `waffle-stick.png`. Preserve
their natural colors with normal blending and no halftone overlays. Place static
ochre or seafoam oval backdrops and subtle offset ink dots behind the four photos.
The stacked cup and Sahlab rows use 180px photo areas with 180px-wide, 196px-high
backdrops. Preserve full photo coverage through the wobble without overlapping
copy or prices. The waffle retains its taller 140px-wide backdrop.
Photos sway between -1.2 and +1.2 degrees over ten seconds
with staggered timing; preserve their display scale when animating. Disable this
motion for `prefers-reduced-motion`. Preserve multiply blending and halftone on screen 2 illustrations,
and keep all texture away from text.
Record new or replacement artwork provenance in `assets/README.md`. Screen 2 images
are illustrative placeholders; do not describe them as photos of actual servings.
Screen 1 photos have AI edits and reconstructed details; preserve that provenance.
The lighthouse is a simplified motif, not the official store logo.

Keep motion gentle: the existing dessert animation rocks between -2 and +2 degrees
over seven seconds with staggered timing. Animate artwork only; menu text and prices
must stay still. Preserve the `prefers-reduced-motion` override for all animations.
Keep decorative image alt text empty when adjacent text supplies the information;
retain semantic headings and accessible labels.

## Menu content and behavior

Edit menu content in `screen1-data.js` or `screen2-data.js`; do not duplicate it in HTML or CSS. Preserve
confirmed item names, descriptions, prices, and upgrade notation unless asked to
change them. A `null` or empty price stays hidden. Never invent prices, promotions,
serving claims, or badges to fill space. Preserve safe text escaping, screen
selection, hourly refresh, viewport fitting, and fullscreen behavior.

## Verification before delivery

For menu content, code, style, or artwork changes:

1. Run `node --test tests/menu.test.js` and address relevant failures. These checks
   cover behavior and assets; they do not establish visual correctness.
2. Serve locally with `python -m http.server 8000 --bind 127.0.0.1`. Inspect both
   `/screen1.html` and `/screen2.html` at 1920 × 1080 and a smaller 16:9 viewport
   such as 1280 × 720. Check a different aspect ratio when modifying canvas fitting.
3. Check long names, description wrapping, every visible price, footer spacing,
   artwork overlap, and tilted edges. Confirm both screens use the same design system.
4. For motion or control changes, check reduced motion, keyboard focus, and
   fullscreen entry/exit as applicable.

For documentation-only changes, review the diff and check guidance against the
current source; no runtime tests are required. Report any verification you could
not perform rather than claiming it passed.
