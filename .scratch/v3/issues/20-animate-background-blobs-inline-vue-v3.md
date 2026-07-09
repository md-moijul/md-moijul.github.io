## What to build

Upgrade the background animation for v3 by moving away from a static CSS `background-image` and instead inlining the SVG as a Vue component (e.g., `BackgroundBlobs.vue`). 

This approach serves as an alternative to the SMIL-only implementation to test performance and flexibility. Like the other approach, we will introduce a subtle "lava lamp" effect consisting of mixed drifting (translation) and pulsing (scaling).

To ensure the shapes remain anchored to their original layout positions, the existing `<ellipse>` and `<path>` nodes will be wrapped in new `<g>` tags inside the Vue component template. We will use CSS animations or Tailwind utilities applied to these wrapper groups to drive the movement, using asynchronous timings (e.g. 20s drift and 17s pulse) to create an organic, unpredictable feel.

## Acceptance criteria

- [ ] Create a new Vue component (e.g., `src/components/ui/BackgroundBlobs.vue`) containing the contents of `Ellipses.svg`.
- [ ] Remove the `background-image: url('./assets/Ellipses.svg')` from `src/style.css`.
- [ ] Insert the new component into the root layout (e.g., `App.vue`), ensuring it sits fixed behind all page content.
- [ ] Wrap the `<ellipse>` and `<path>` elements in `<g>` tags within the SVG template.
- [ ] Implement drifting (translation) and pulsing (scaling) via CSS animations (e.g. `@keyframes`) or Vue-compatible animation logic targeting the `<g>` tags.
- [ ] The timings for translation and scaling are sufficiently long (e.g. >15 seconds) to be subtle and tasteful.
- [ ] The timings are slightly offset between blobs (e.g., 20s vs 22s) so they move out-of-sync.
- [ ] The overall visual layout is preserved; shapes do not drift permanently off-screen or break the original composition.

## Blocked by

None - can start immediately

## Status

Skipped: We pivoted to using standard HTML `<div>` elements with CSS `radial-gradient` and `filter: blur()` instead of an inline SVG, as the SVG approach was still too heavy. See Issue 22 and 23.
