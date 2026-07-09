## What to build

Implement a comprehensive tuning environment for the background noise and blobs, allowing us to find the exact visual balance we want. After establishing the ideal configuration, hardcode the tuned defaults into the background component.

## Acceptance criteria

- [x] Migrate background noise from global CSS to an inline Vue component with a reactive tuning panel.
- [x] Implement responsive sliders and toggles for `noiseType`, `baseFrequency`, `numOctaves`, `contrast`, `blur`, `opacity`, and `crispEdges`.
- [x] Add individual blob styling controls (blur and opacity) and a visual outline mode to isolate and match original SVG boundaries.
- [x] Build an experiment gradient mode and a Legacy mode (pre-v3) for side-by-side comparison of old and new implementations.
- [x] Resolve z-indexing double-render bugs on the `/tune` route by ensuring `App.vue` hides the default background when on the tuning page.
- [x] Apply the final tuned settings as defaults for the production background.

## Final Settings Applied

```json
{
  "type": "turbulence",
  "baseFrequency": 3.75,
  "numOctaves": 2,
  "contrast": 1000,
  "blur": 0,
  "opacity": 0.35,
  "crispEdges": true
}
```

## Blocked by

- .scratch/v3/issues/28-cleanup-overlay-and-reapply-animations.md

## Status

Completed: Tuning environment built, bugs resolved, and final settings hardcoded as component defaults.
