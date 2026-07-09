## What to build

Upgrade the background animation for v3 by animating the shapes inside `src/assets/Ellipses.svg`. We will use SMIL animations to introduce a subtle "lava lamp" effect consisting of mixed drifting (translation) and pulsing (scaling).

To ensure the shapes remain anchored to their original layout positions, the existing `<ellipse>` and `<path>` nodes will be wrapped in new `<g>` tags. The new `<animateTransform>` tags will be applied to these groups, using asynchronous timings (e.g. 20s drift and 17s pulse) to create an organic, unpredictable movement. No changes will be made to Vue components or the `style.css` configuration.

## Acceptance criteria

- [ ] All `<ellipse>` and `<path>` elements in `Ellipses.svg` that represent the blobs are wrapped in `<g>` tags.
- [ ] SMIL `<animateTransform type="translate">` and `<animateTransform type="scale">` tags are added to the wrapper groups.
- [ ] The `additive="sum"` attribute is used correctly where needed.
- [ ] The timings for translation and scaling are sufficiently long (e.g. >15 seconds) to be subtle and tasteful.
- [ ] The timings are slightly offset between blobs (e.g., 20s vs 22s) so they move out-of-sync.
- [ ] The overall visual layout is preserved; shapes do not drift permanently off-screen or break the original composition.

## Blocked by

None - can start immediately

## Status

Skipped: We explored SMIL but found it caused too much CPU overhead and stuttering. We pivoted to using standard HTML `<div>` elements with CSS `radial-gradient` and GPU-accelerated CSS animations instead (see Issue 22 and 23).
