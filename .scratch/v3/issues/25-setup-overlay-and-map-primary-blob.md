## What to build

Set up the `Ellipses.svg` as a temporary 50% opacity overlay in `BackgroundBlobs.vue` to act as our visual truth. Mathematically map the very first blob (the large teal/cyan ellipse) to standard CSS fluid units (`vw`/`vh`) and a CSS `linear-gradient`. This proves our scaling math works and gives us a baseline for the remaining blobs.

## Acceptance criteria

- [x] Add the raw `Ellipses.svg` template directly into `BackgroundBlobs.vue` as a `fixed`, `opacity: 0.5` overlay.
- [x] Calculate the CSS `left`, `top`, `width`, and `height` in fluid `vw`/`vh` units for the primary teal/cyan ellipse based on the SVG's 1440x900 viewBox.
- [x] Replicate the teal/cyan SVG `<linearGradient>` as a CSS `linear-gradient(...)` background on the `.blob1` element.
- [x] Visually verify that the CSS blob perfectly eclipses the underlying SVG teal/cyan blob in the browser.

## Blocked by

None - can start immediately

## Status

Completed: Overlay created and primary blob mapped.
