## What to build

Now that all 6 shapes are mapped perfectly via CSS, clean up the temporary SVG overlay from the component. Finally, re-apply the buttery-smooth GPU-accelerated drift animations (`translate3d`) to all 6 blobs to bring them back to life.

## Acceptance criteria

- [x] Delete the temporary `Ellipses.svg` overlay code from `BackgroundBlobs.vue`.
- [x] Ensure all 6 `.blob` elements have `will-change: transform`.
- [x] Assign distinct, staggered, long-duration (>15s) CSS `@keyframes` drift animations to all 6 blobs.
- [x] Ensure the animations use `infinite alternate` for a seamless organic loop.

## Blocked by

- .scratch/v3/issues/27-approximate-complex-svg-paths.md

## Status

Completed: Animations applied to all blobs and overlay removed.
