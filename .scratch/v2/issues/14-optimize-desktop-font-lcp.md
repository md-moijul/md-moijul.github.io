---
title: Optimize Desktop LCP via Synchronous Font Preloading
type: AFK
---

## What to build

Update the font loading strategy in `index.html` to eliminate the massive Largest Contentful Paint (LCP) delay on Desktop caused by asynchronous font swapping.

Currently, Google Fonts are loaded using an async `onload` hack (`onload="this.onload=null;this.rel='stylesheet'"`). While this prevents initial render blocking, it forces the LCP element (the large Desktop `NavigationPanel` title) to wait for the font download to complete before painting the final text, causing a ~3.9s LCP delay under simulated 4G throttling.

Remove the async hack and replace it with a standard `<link rel="stylesheet">` combined with proper `<link rel="preload" as="font" crossorigin>` tags pointing to the critical Google Fonts to ensure the text can be painted immediately.

## Acceptance criteria

- [x] The `onload` hack is removed from the Google Fonts link in `index.html`.
- [x] The Google Fonts are loaded with a standard `<link rel="stylesheet">` or inline `@font-face`.
- [x] Proper `<link rel="preload" as="font">` tags are added for the critical fonts (Play and Plaster) to ensure they download immediately in the critical path.
- [x] A Desktop Lighthouse audit shows LCP < 1.0s and an improved Speed Index.

## Blocked by

None - can start immediately
