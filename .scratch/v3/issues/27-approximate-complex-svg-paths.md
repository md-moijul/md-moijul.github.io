## What to build

Map the tricky organic `<path>` shapes and the double-layered yellow/pink shape from the SVG. Rather than using complex `clip-path` rules, stretch and rotate standard CSS ellipses (`border-radius: 50%`) to approximate their shapes. Since they have a 100px blur, the approximation will be visually identical to the original path.

## Acceptance criteria

- [x] Create 3 new `.blob` elements for the yellow/pink shape, the cyan/green path, and the cyan/pink path.
- [x] Apply `border-radius: 50%` and use `transform: scaleX(...) rotate(...)` (or similar stretching) to approximate the organic shapes of the paths.
- [x] Copy their respective `linear-gradient` stops perfectly into CSS.
- [x] Visually verify that the stretched CSS blobs adequately cover and match the blur profile of the original SVG paths in the overlay.

## Blocked by

- .scratch/v3/issues/26-map-remaining-standard-ellipses.md

## Status

Completed: Added 3 new blob divs with stretched border-radius shapes and corresponding math to simulate the complex SVGs.
