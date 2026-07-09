## Parent

Issue: .scratch/v3/issues/21-migrate-background-blobs-inline.md

## What to build

Bring the static CSS `<div>` blobs to life using highly performant, GPU-accelerated CSS animations. Use `@keyframes` with `transform: translate3d(...)` and `scale(...)` to smoothly drift the blobs around the screen. By utilizing `will-change: transform`, the browser will offload the animation to the GPU, guaranteeing a buttery-smooth 60fps "lava lamp" effect without CPU jank.

## Acceptance criteria

- [x] Define CSS `@keyframes` animations (`drift-1`, `drift-2`, etc.) that use `transform: translate3d(...)` and `scale(...)`.
- [x] Apply `will-change: transform;` to the blob `<div>` elements to force GPU acceleration.
- [x] Assign the drift animations to the blobs with staggered, long durations (>15s).
- [x] Ensure the animations use `infinite` and `alternate` for a seamless organic loop.
- [x] Visually verify that the animation is buttery smooth and no longer stutters like the previous SVG implementation.

## Blocked by

- .scratch/v3/issues/22-implement-static-css-blobs.md

## Status

Completed: Animations were added and are GPU-accelerated.
