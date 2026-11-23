# Dessert artwork

These are decorative AI-generated illustrations for the Retro Parlour menu, not photographs or exact representations of Lakeside servings. Generated with the built-in image generation tool, then resized and encoded as local JPEGs for the TV browser. The menu has no runtime image service dependency.

The photo cutouts documented below are user-supplied images edited with the built-in image generation tool. Screen 1 uses all four photo assets in its four-section menu; screen 2 uses the existing illustrations.

## Edited photo cutouts

These photo assets are local RGBA PNGs with transparent backgrounds. They were enhanced from the supplied photos using built-in imagegen background extraction and resolution enhancement. Fine detail and areas previously hidden by removed objects may be reconstructed by AI; these are edited images, not unmodified originals. No original image was overwritten. The filenames describe the supplied subjects rather than asserting a serving size.

Use the PNG alpha channel when placing them in the menu. To preserve photographic colors, screen 1 uses normal blending for photos rather than the multiply treatment intended for illustrations. Keep the photos free of halftone overlays; the decorative ovals and dots sit behind them as CSS backdrops. All four photos sway gently by 1.2 degrees over ten seconds with staggered timing, disabled for reduced motion. Review any future placement separately for fit and consistency with the Retro Parlour layout.

### pistachio-strawberry-cup-photo.png

Source: first user-supplied photo, showing strawberries, chocolate, pistachio cream, and chopped pistachios in a clear cup on white. Original resolution: 736 × 862. Final edited resolution: **1152 × 1366**. The sharp protrusions along the top have been rounded at the user's request.

Edit prompt (built-in imagegen; transparent background enabled):

> Use case: background-extraction. EDIT TARGET: the provided photograph of a clear plastic dessert cup containing strawberries, chocolate, pale green pistachio cream and chopped pistachios. Primary request: remove the entire white background and upscale the SAME photograph to a high-resolution product cutout for a 1080p TV dessert menu. Output a single high-quality RGBA PNG on genuine alpha transparency, ideally at least 2048 pixels tall. Preserve the original cup silhouette, camera angle, transparent plastic rim, layered chocolate and pistachio cream, strawberry arrangement, chopped pistachios, proportions, natural food colors and photographic appearance. Retain the whole cup including its base, with a small even transparent margin. Carefully remove white edge halos and background fringes without erasing clear rim highlights. Improve resolution and gently recover detail without over-sharpening or changing the product. No new toppings, props, text, graphics, drop shadow, backdrop, white fill, checkerboard pattern, illustration styling, crop, or redesign.

Refinement prompt (built-in imagegen; transparent background enabled):

> Use case: precise-object-edit. Edit target: the attached transparent PNG photograph of the pistachio, chocolate and strawberry dessert cup. Make ONLY a small local cleanup to the upper outline: round off the sharp pointed triangular chocolate peak behind the highest strawberry, and soften the sharp angular pistachio/chocolate corners at the upper left and upper right. Replace these pointed tips with smooth natural rounded creamy contours, not a straight clipped line. Clean jagged extraction edges along the top with smooth antialiasing. Keep the strawberries, pistachio pieces, toppings, cup rim, the rest of the chocolate and pistachio layers, entire lower cup, camera angle, lighting, vivid natural food colors, proportions, crisp texture and overall composition unchanged. No overall blur or new food, no reshooting or redesign. Preserve photographic style and the existing high resolution (at least 1152 by 1365 if possible). Entire cup including base remains visible with a small transparent margin. Output RGBA PNG with genuine alpha transparency. No background, white fill, shadow, props, text, or checkerboard pixels.

### chocolate-strawberry-cup-photo.png

Source: second user-supplied photo, showing a chocolate strawberry cup held in a hand against a street scene. Original resolution: 459 × 668. Final edited resolution: **1028 × 1529**. The hand, sleeve, and street have been removed. Follow-up edits remove the wooden spoon and the black printing near the bottom of the cup, restoring the surfaces they obscured.

Edit prompt (built-in imagegen; transparent background enabled):

> Use case: background-extraction. EDIT TARGET: the provided photograph of the chocolate-covered strawberry cup held in a hand in front of a blurred street and lights. Primary request: isolate the SAME dessert cup, completely remove the street, lights, hand and sleeve, and upscale the photograph into a high-resolution product cutout for a 1080p TV menu. Output one high-quality RGBA PNG on genuine alpha transparency, ideally at least 2048 pixels tall. Preserve the photographed clear plastic cup, its oval rim, angle and proportions, chocolate folds and drips, visible strawberries and their exact arrangement, original natural colors, reflections and small existing printed cup mark. Preserve the visible spoon as part of the product, retaining its original shape and position; do not invent an extension outside the source frame. Reconstruct only the small portions of the cup edge obscured by the removed fingers so the cup stands alone naturally. Show the entire cup and its base, with a small transparent margin. Improve resolution and gently recover photographic detail without making the chocolate plastic or inventing toppings. Clean product edges with no street-color fringes. No hand, fingers, clothing, background, shadow, checkerboard pattern, white fill, new labels, props, decorative text, illustration style, or redesign.

Refinement prompt (built-in imagegen; transparent background enabled):

> Use case: precise-object-edit. Edit target: the attached transparent PNG photograph of a chocolate strawberry cup with a long wooden spoon sticking up on its left side. Completely remove the entire wooden spoon, including the long handle above the cup and every visible part down inside the cup. Restore the small areas of the left plastic rim, chocolate and strawberry that were occluded by the spoon, following the existing shapes naturally. The left strawberry and its green leaf remain. Keep everything else unchanged: original strawberry arrangement, chocolate folds and drips, entire cup silhouette and base, clear plastic highlights and oval rim, colors, lighting, photographic texture, camera angle, proportions, and existing printed cup mark. Do not invent new toppings or replace the product. Keep the high resolution (at least 1033 by 1522 if possible) and the entire cup visible with a small transparent margin. Output RGBA PNG with genuine alpha transparency. No spoon, wooden stick, utensil remnants, hands, clothing, backdrop, white fill, checkerboard pixels, shadow, extra objects, or new text.

Printing removal prompt (built-in imagegen; transparent background enabled):

> Use case: precise-object-edit. Edit target: the attached transparent PNG photograph of the chocolate strawberry dessert cup without a spoon. Remove ONLY the black printed recycling symbol, the 100% text, the two lines of black lettering and the curved black strokes near the bottom front of the plastic cup. Seamlessly restore the natural brown chocolate surface visible through clear plastic in that small region, matching the existing highlights, texture, shading and curvature. Keep everything else unchanged: the entire cup silhouette, base, transparent rim and reflections, all strawberries, chocolate folds and drips, photographic color and texture, camera angle, proportions, composition and high resolution. Do not add a spoon, any text or a logo. Preserve the full cup and the genuine alpha-transparent background, output RGBA PNG at the existing 1033 by 1523 resolution or higher. No backdrop, white fill, checkerboard pattern, new props or shadows.

### sahlab.png

Source: user-supplied 1200 × 1200 photograph of sahlab in a clear glass mug, garnished with cinnamon and pistachio slivers. Final edited resolution: **1086 × 1448**. The background and entire glass handle are removed, leaving a smooth handleless glass. The full glass, garnish, and base remain visible. Used in the third row of screen 1's upper-left cup/drink section.

Edit prompt (built-in imagegen; transparent background enabled):

> Use case: precise-object-edit and background-extraction. Edit target: the supplied photograph of a clear glass mug of sahlab topped with cinnamon powder and sliced green pistachios. Remove the entire background, tabletop, cloth, cinnamon sticks, and second mug. Remove the entire glass handle on the right, including both attachment points, restoring a smooth continuous glass wall so the drink is in a handleless clear tumbler. Preserve the original drink and its natural photographic appearance: ivory-white sahlab, cinnamon dusting, exact pistachio garnish arrangement, oval glass rim, glass thickness and base, vessel proportions, camera angle, highlights and realistic reflections. Remove background colors visible through the clear glass rim and base while retaining the glass highlights and refraction naturally against alpha transparency. Improve sharpness and clarity gently for a high-quality TV menu asset; output a high-resolution RGBA PNG, ideally 2048 pixels tall or higher, without synthetic over-sharpening. Keep the full drink from rim to base visible, centered with a small even transparent margin. Genuine transparent background; no white or solid fill, no checkerboard pixels, no cast shadow, no handle remnants, no extra props, text, logos, or changes to toppings.

### waffle-stick.png

Source: user-supplied 399 × 501 photograph of a chocolate-drizzled waffle stick in a white serving tray, held in front of plants. Final edited resolution: **887 × 1774**. The background, hand, and tray are removed; only the waffle and attached wooden stick remain. Golden waffle tones, chocolate contrast, and clarity are enhanced for TV presentation. At the user's request, a white drizzle pattern has been added over the original chocolate topping; this is an edited presentation, not an unmodified serving photo. Used as the shared photo beside screen 1's three waffle options; the toppings in the image do not depict every listed variant.

Edit prompt (built-in imagegen; transparent background enabled):

> Use case: background-extraction and precise-object-edit. Edit target: the supplied photograph of a long chocolate-drizzled waffle stick in a narrow white paper serving tray, held upright against green plants. Isolate ONLY the waffle dessert, its wooden stick and the original white serving tray on genuine alpha transparency. Completely remove the hand, fingers, leaves, plants, wall and all scenery. Restore the small tray edges previously occluded by fingers, preserving the tray shape and paper folds. Preserve the waffle's long ridged shape, exact portion and toppings: golden baked waffle, dark and milk chocolate drizzle and dark cookie crumbs. Keep the original near-top-down viewing angle, composition and realistic photographic textures. Make colors pop tastefully for a 1080p TV menu: warmer golden waffle highlights, richer chocolate browns, modestly improved exposure and contrast, crisp visible waffle ridges and crumbs, clean neutral white tray without green color spill. No neon colors, orange cast, artificial gloss, crushed black toppings or excessive sharpening. Upscale and recover fine detail carefully from the low-resolution photo; high-resolution RGBA PNG, ideally 2048 pixels tall or more. Show the entire tray and waffle from top to bottom plus visible wooden stick, centered with a little transparent padding, without cutting off the food. No background, checkerboard pixels, white backdrop, cast shadow, new toppings, text, logos, props or extra utensils.

Refinement prompt (built-in imagegen; transparent background enabled):

> Use case: precise-object-edit. Edit target: the attached high-resolution transparent PNG of a chocolate-drizzled waffle stick in a white paper serving tray. Remove the entire paper tray and all loose crumbs or chocolate smears that were resting on the tray, leaving ONLY the waffle dessert with its attached wooden stick. Keep the crumb topping adhered to the waffle and the existing dark/milk chocolate drizzle. Add a clean, appetizing creamy white drizzle pattern: fine continuous diagonal zigzag ribbons of white chocolate across the length of the waffle, layered over the existing chocolate, realistic raised sauce texture and highlights, leaving plenty of golden waffle and dark chocolate visible. White drizzle stays on the dessert and never extends into the transparent space. Preserve the original long ridged waffle shape, golden baked color, photographic texture, proportions, lighting, near-top-down angle, and wooden stick. Restore any waffle edge that was obscured by the tray naturally. Center vertically with the entire waffle and whole wooden stick visible and a modest transparent margin. Maintain high-resolution photographic quality, ideally at least 1774 pixels tall. Output genuine RGBA alpha transparency. No tray, plate, paper, hand, background, cast shadow, checkerboard pattern, text, new props or other toppings.

## scoop-illustration.jpg

Prompt: A single generous scoop of vanilla ice cream on an upright golden waffle cone, exactly one scoop, entire cone visible. Vintage 1960s parlour lithograph/risograph food illustration with fine navy outlines, golden ochre waffle texture, pale creamy scoop, blue shadows, and delicate halftone stippling. Centered on a uniform paper-yellow `#E8E0C0` background. No text, logo, mascot, garnish, hands, holder, or other food.

## dubai-cup-illustration.jpg

Prompt: A clear dessert cup showing milk chocolate sauce, pale green pistachio cream, and crunchy golden shredded kataifi pastry, with chocolate coating and pistachio crumbs on top. Vintage 1960s parlour lithograph/risograph food illustration with fine navy outlines, cocoa brown and pistachio green, ochre pastry texture, and delicate halftone stippling. Entire cup visible in a three-quarter front view on a uniform paper-yellow `#E8E0C0` background. No strawberries, cone, spoon, text, logo, mascot, hands, or other food.


## Cartoon item placeholders

Generated with the built-in image generation tool and resized to 320 × 320 PNGs for small TV menu thumbnails. Backgrounds use the menu paper color; no external image requests occur at runtime. These are illustrative placeholders, not exact serving depictions.

### bubble-waffle.png

Prompt: Use case: product-mockup. Asset type: small cartoon placeholder illustration for a dessert menu. Subject: a bubble waffle folded into a cup holding vanilla ice cream. Style: charming cartoony vintage parlour food illustration, fine navy outlines, rounded appetizing forms, ochre and natural dessert colors, subtle halftone shading. Entire object visible, centered with generous padding, three-quarter front view, square image. Uniform paper-yellow #E8E0C0 background. No text, logos, faces, people, hands or extra objects.

### ice-cream-taco.png

Prompt: Use case: product-mockup. Asset type: small cartoon placeholder illustration for a dessert menu. Subject: a waffle shell ice cream taco with chocolate edging. Style: charming cartoony vintage parlour food illustration, fine navy outlines, rounded appetizing forms, ochre and natural dessert colors, subtle halftone shading. Entire object visible, centered with generous padding, three-quarter front view, square image. Uniform paper-yellow #E8E0C0 background. No text, logos, faces, people, hands or extra objects.

### cookie-dough-sundae.png

Prompt: Use case: product-mockup. Asset type: small cartoon placeholder illustration for a dessert menu. Subject: a short sundae cup of vanilla ice cream, cookie dough chunks and chocolate fudge. Style: charming cartoony vintage parlour food illustration, fine navy outlines, rounded appetizing forms, ochre and natural dessert colors, subtle halftone shading. Entire object visible, centered with generous padding, three-quarter front view, square image. Uniform paper-yellow #E8E0C0 background. No text, logos, faces, people, hands or extra objects.

### cookie-sandwich.png

Prompt: Use case: product-mockup. Asset type: small cartoon placeholder illustration for a dessert menu. Subject: a thick vanilla ice cream sandwich between two chocolate chip cookies. Style: charming cartoony vintage parlour food illustration, fine navy outlines, rounded appetizing forms, ochre and natural dessert colors, subtle halftone shading. Entire object visible, centered with generous padding, three-quarter front view, square image. Uniform paper-yellow #E8E0C0 background. No text, logos, faces, people, hands or extra objects.

### strawberry-cup.png

Prompt: Use case: product-mockup. Asset type: small cartoon placeholder illustration for a dessert menu. Subject: a clear dessert cup of fresh strawberries drizzled generously with Belgian chocolate. Style: charming cartoony vintage parlour food illustration, fine navy outlines, rounded appetizing forms, ochre and natural dessert colors, subtle halftone shading. Entire object visible, centered with generous padding, three-quarter front view, square image. Uniform paper-yellow #E8E0C0 background. No text, logos, faces, people, hands or extra objects.

### dubai-ice-cream.png

Prompt: Use case: product-mockup. Asset type: small cartoon placeholder illustration for a dessert menu. Subject: pistachio ice cream topped with golden kataifi strands and chocolate drizzle in a small cup. Style: charming cartoony vintage parlour food illustration, fine navy outlines, rounded appetizing forms, ochre and natural dessert colors, subtle halftone shading. Entire object visible, centered with generous padding, three-quarter front view, square image. Uniform paper-yellow #E8E0C0 background. No text, logos, faces, people, hands or extra objects.

### milkshake.png

Prompt: Use case: product-mockup. Asset type: small cartoon placeholder illustration for a dessert menu. Subject: a strawberry milkshake in a tall glass with whipped cream and a straw. Style: charming cartoony vintage parlour food illustration, fine navy outlines, rounded appetizing forms, ochre and natural dessert colors, subtle halftone shading. Entire object visible, centered with generous padding, three-quarter front view, square image. Uniform paper-yellow #E8E0C0 background. No text, logos, faces, people, hands or extra objects.

### hot-chocolate-sahlab.png

Prompt: Use case: product-mockup. Asset type: small cartoon placeholder illustration for a dessert menu. Subject: two small cozy mugs side by side, one hot chocolate and one ivory sahlab with cinnamon. Style: charming cartoony vintage parlour food illustration, fine navy outlines, rounded appetizing forms, ochre and natural dessert colors, subtle halftone shading. Entire object visible, centered with generous padding, three-quarter front view, square image. Uniform paper-yellow #E8E0C0 background. No text, logos, faces, people, hands or extra objects.

### waffle-cone.png

Prompt: Use case: product-mockup. Asset type: small cartoon placeholder illustration for a dessert menu. Subject: an empty golden waffle ice cream cone. Style: charming cartoony vintage parlour food illustration, fine navy outlines, rounded appetizing forms, ochre and natural dessert colors, subtle halftone shading. Entire object visible, centered with generous padding, three-quarter front view, square image. Uniform paper-yellow #E8E0C0 background. No text, logos, faces, people, hands or extra objects.

### waffle-bowl.png

Prompt: Use case: product-mockup. Asset type: small cartoon placeholder illustration for a dessert menu. Subject: an empty golden edible waffle bowl. Style: charming cartoony vintage parlour food illustration, fine navy outlines, rounded appetizing forms, ochre and natural dessert colors, subtle halftone shading. Entire object visible, centered with generous padding, three-quarter front view, square image. Uniform paper-yellow #E8E0C0 background. No text, logos, faces, people, hands or extra objects.
