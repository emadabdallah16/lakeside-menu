# Menu design guidance

These instructions apply to the entire repository and to all future menu changes.
Preserve the established **Retro Parlour** design unless the user explicitly requests
a different direction. Apply requested design-system changes consistently across
both TVs and update this file and the design notes in `README.md` in the same change.
Routine content edits should use the existing design without restyling components.

## Project structure

- `style.css` owns the shared palette, typography, components, and layout.
- `app.js` renders both menus and handles viewport scaling and fullscreen controls.
- `menu-data.js` owns menu names, descriptions, prices, and artwork paths.
- `screen1.html` and `screen2.html` are the TV entry points. `index.html` defaults
  to TV 1 and supports `?screen=2`.
- `assets/README.md` records illustration provenance and prompts.

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
| Brand name | `'Times New Roman', Times, serif` | Bold italic, 80px, line-height .95, tracking -4px |
| Main menu heading | `'Times New Roman', Times, serif` | Bold italic, 132px, line-height 1.1, tracking -6px |
| Feature name | `'Times New Roman', Times, serif` | Bold italic, 52px, line-height 1.15, tracking -1.5px |
| Menu item name | `Helvetica, Arial, sans-serif` | Bold, 48px, line-height 1.08, tracking -1.5px |
| Brand subtitle | `'Courier New', Courier, monospace` | Bold, 25px, line-height 1.25, tracking 2px |
| Feature description | `'Courier New', Courier, monospace` | Regular, 24px, line-height 1.3 |
| Item description | `'Courier New', Courier, monospace` | Regular, 28px, line-height 1.3 |
| Footer | `'Courier New', Courier, monospace` | Regular, 28px, line-height 1.2; bold prices |
| Item price | `'Times New Roman', Times, serif` | Bold, 44px, line-height 1 |
| Feature price | `'Times New Roman', Times, serif` | Bold, 88px, line-height 1, tracking -5px |

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
- Preserve the hierarchy: brand bar, large menu heading, left feature panel,
  right menu list, and footer. Each screen currently has one feature and four rows.
  If content requires a different count, deliberately adapt and verify the layout;
  the current list grid assumes four rows.
- Use the existing spacing as the baseline: canvas padding 64px vertically and
  80px horizontally, 32px between major rows, a 600px feature column, and an 80px
  gap between content columns. Keep generous whitespace and TV-distance readability.
- Keep item names and prices aligned on a shared heading row, descriptions below,
  and illustrations beside the copy. Prices must remain fully visible and unbroken.
  Allow long names to wrap without colliding with adjacent rows or artwork.
- Retain the printed tilt pattern: brand bar, heading, and footer at -2 degrees;
  feature panel at -3 degrees; menu list at +2 degrees; feature price label at
  +5 degrees. Check transformed edges for clipping.
- Retain dashed item dividers and the double-rule footer. Add new elements by
  extending these patterns rather than inventing a separate card or label system.
- Keep fullscreen setup controls outside the scaled canvas, keyboard accessible,
  and hidden when idle or in fullscreen, as currently implemented.

## Artwork and motion

Use local dessert illustrations with navy outlines, warm natural dessert colors,
ochre details, and subtle printed shading. Match the paper background or use
compatible transparency. Keep the entire dessert visible with `object-fit: contain`.
Preserve the existing multiply blending and keep halftone overlays away from text.
Record new or replacement artwork provenance in `assets/README.md`. Existing images
are illustrative placeholders; do not describe them as photos of actual servings.
The lighthouse is a simplified motif, not the official store logo.

Keep motion gentle: the existing dessert animation rocks between -2 and +2 degrees
over seven seconds with staggered timing. Animate artwork only; menu text and prices
must stay still. Preserve the `prefers-reduced-motion` override for all animations.
Keep decorative image alt text empty when adjacent text supplies the information;
retain semantic headings and accessible labels.

## Menu content and behavior

Edit menu content in `menu-data.js`; do not duplicate it in HTML or CSS. Preserve
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
