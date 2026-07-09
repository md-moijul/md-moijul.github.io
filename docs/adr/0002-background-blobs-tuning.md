# ADR 0002: Background Blobs Tuning and Limitations

## Context and Problem Statement
The original `Ellipses.svg` file was heavily animated but used static SMIL animations which performed poorly and caused CPU overhead. We migrated the blobs to an inline Vue component (`BackgroundBlobs.vue`) using CSS `@keyframes` and `translate3d`/`scale` for hardware acceleration.
However, translating the SVG shapes and mathematical coordinates into CSS `vw` and `vh` units resulted in visual misalignments, forcing us to build a human-in-the-loop tuning environment to manually visually correct the blobs.

## Technical Learnings & Challenges

### 1. The SVG Scaling Illusion
**The Problem:** Initially, the mathematical coordinates for the CSS blobs didn't match the SVG overlay.
**The Cause:** The original CSS used the SVG as `background-size: 100% 100%`, which stretches the image non-uniformly. Our inline SVG overlay preserved its aspect ratio, causing a mismatch.
**The Fix:** We added `preserveAspectRatio="none"` to the inline tuning SVG so it stretched exactly like the CSS `vw`/`vh` units, aligning the coordinate spaces.

### 2. The Rotation vs. Stretch Paradox (Blob 4)
**The Problem:** Blob 4 in CSS was far too squished compared to the SVG, even with exact mathematical matrix values.
**The Cause:** In SVG, a shape is rotated *before* the 1440x900 canvas is stretched to fit the screen. In CSS, the `div` is stretched to `vw/vh` *first*, and then rotated. Stretching a box and then rotating it creates a completely different shape than rotating a box and then stretching the canvas!
**The Attempt:** We briefly implemented a perfect mathematical CSS wrapper to mimic the SVG canvas (`transform: scale(...)`), but reverted it as it felt unnecessary and risked breaking responsive behavior. We opted for manual visual tuning instead, primarily utilizing `rotate()` inside the animations to correct for the squish.

### 3. The Path vs. Potato Limitation (Blobs 5 & 6)
**The Problem:** Blobs 5 and 6 in the SVG are complex, organic vector `<path>`s with concave (inward) curves.
**The Cause:** CSS `border-radius` (even the complex 8-point version) can only create convex (outward-bulging) ovals.
**The Decision:** We decided to accept the CSS "potatoes" as approximations and rotated them to fill the same general area as the SVG paths. 

## Decision
1. **Blobs 1, 2, 3, and 4** will remain as CSS approximations with fine-tuned `rotate()` values to counteract aspect ratio stretching.
2. **Blobs 5 and 6** will remain as simple CSS oval approximations rather than complex vector paths.
3. **Animations** will explicitly include the baseline rotation in every step of the `@keyframes` to prevent CSS animation rules from overwriting the base transform.

## Future Consequences
If we ever require perfect visual fidelity for Blobs 5 and 6 (i.e., we need their exact boomerang/concave shapes), we will need to revisit this component and use CSS `clip-path` with the SVG path data, or inject the SVGs directly. For now, the hardware-accelerated CSS approximation is preferred.
