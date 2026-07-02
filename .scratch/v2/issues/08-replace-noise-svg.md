## What to build

Replace the massive 4.2MB network payload caused by the `Noise.png` background image with a 0-byte inline SVG to optimize Largest Contentful Paint (LCP).

- In `src/style.css`, locate the `body::before` block.
- Replace `background-image: url('./assets/Noise.png');` with the inline SVG noise data URL currently used in `src/components/ui/card/Card.vue` (under the `.noise-bg` class).
- Delete `src/assets/Noise.png` entirely from the codebase.

## Acceptance criteria

- [x] `Noise.png` is deleted from the repository.
- [x] `src/style.css` uses the inline SVG data URL for the `body::before` background image.
- [x] The global background noise aesthetic remains visually identical.
- [x] The network payload for the background noise effectively drops to 0 bytes.

## Blocked by

None - can start immediately
