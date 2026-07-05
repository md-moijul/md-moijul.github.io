---
title: Self-host critical Google Fonts
type: AFK
---

## What to build

Eliminate the render-blocking external network request to `fonts.googleapis.com` to improve the Largest Contentful Paint (LCP) time. Download the required Google Fonts (`Play` and `Plaster`) as `.woff2` files and place them in the project's local assets. Update `index.html` and any global CSS to serve these fonts locally. 

## Acceptance criteria

- [x] Download `.woff2` files for the `Play` (weights 400, 700) and `Plaster` fonts.
- [x] Add the font files to the `public/` or `src/assets/` directory.
- [x] Update `index.html` to remove external `preconnect` and `stylesheet` links to `fonts.googleapis.com` and `fonts.gstatic.com`.
- [x] Add `@font-face` declarations to the global stylesheet or directly in `index.html` to load the local `.woff2` files.
- [x] Add `<link rel="preload" as="font" crossorigin>` tags for the critical local font files in `index.html`.

## Blocked by

None - can start immediately
