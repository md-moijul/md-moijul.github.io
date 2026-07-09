## Parent

Issue: .scratch/v3/issues/20-animate-background-blobs-inline-vue-v3.md

## What to build

Migrate the background blob SVG from a static CSS `background-image` (which uses problematic SMIL animations) into a fully inline Vue component (`BackgroundBlobs.vue`). This inline component will apply standard CSS `@keyframes` animations directly to the internal SVG `<g>` groups to achieve a smooth, hardware-accelerated "lava lamp" drifting and pulsing effect. The new component will be injected into the root layout behind all content.

## Acceptance criteria

- [ ] Create `src/components/ui/BackgroundBlobs.vue` using the shapes from `Ellipses.svg` (completely stripped of SMIL `<animateTransform>` tags).
- [ ] Remove the `background-image: url('./assets/Ellipses.svg');` styling from `src/style.css`.
- [ ] Inject `<BackgroundBlobs />` into the background of `src/App.vue` using fixed positioning.
- [ ] Apply CSS animations (`@keyframes` in a scoped style block) to the SVG `<g>` tags to translate and scale them.
- [ ] Ensure the animation durations are long (> 15s) and staggered between blobs for an organic, out-of-sync effect.

## Blocked by

None - can start immediately

## Status

Skipped: We decided to replace the SVG `<g>` tags entirely with simple HTML `<div>` elements for better performance. This issue was superseded by Issue 22 and 23.
