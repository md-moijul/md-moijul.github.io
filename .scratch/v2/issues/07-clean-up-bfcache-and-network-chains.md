## Parent

[Performance Baseline Report](file:///home/moijul/Downloads/personal/personal-portfolio/.scratch/performance/2026-07-01-baseline-report.md)

## What to build

Improve overall page network performance and cross-page navigation by addressing back/forward cache (bfcache) prevention and render-blocking network chains. Remove `unload` event listeners or any conflicting features preventing bfcache restoration. Defer non-critical CSS/JS, reduce deep import chains, and optimize large network payloads.

## Acceptance criteria

- [x] Remove `unload` event listeners and ensure the page is eligible for bfcache.
- [x] Defer non-critical CSS and JS to unblock the initial page render.
- [x] Flatten deep network import chains and review payload sizes.
- [x] Verify bfcache restoration works correctly via DevTools Application panel.

## Blocked by

None - can start immediately
