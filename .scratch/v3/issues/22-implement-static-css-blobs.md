## Parent

Issue: .scratch/v3/issues/21-migrate-background-blobs-inline.md

## What to build

Replace the inline `<svg>` elements in `BackgroundBlobs.vue` with simple, absolutely-positioned HTML `<div>` elements to improve rendering performance. Apply CSS `radial-gradient` backgrounds to these divs that match the original teal/cyan, orange/white, and pink/yellow blob colors. Apply a standard CSS `filter: blur(...)` to achieve the soft, diffused look, avoiding the heavy CPU cost of SVG filters.

## Acceptance criteria

- [x] Replace the `<svg>` tag and its children in `BackgroundBlobs.vue` with 3-4 `<div>` elements.
- [x] Style the `<div>` elements with `position: absolute` and sizes that approximate the original blobs.
- [x] Apply CSS `radial-gradient` backgrounds to match the color profiles of the original blobs.
- [x] Apply CSS `filter: blur(100px)` (or a similar large value) to diffuse the blobs.
- [x] Ensure the component still renders properly behind the main content.

## Blocked by

None - can start immediately

## Status

Completed: Implemented the static CSS div blobs successfully.
