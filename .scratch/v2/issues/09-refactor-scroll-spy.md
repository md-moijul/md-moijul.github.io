## What to build

Refactor `useScrollSpy.ts` to use `IntersectionObserver` instead of the layout-thrashing `getBoundingClientRect()`. This will eliminate ~13.5s of main-thread CPU blockage (Total Blocking Time) during page load and scrolling.

- Remove the `el.getBoundingClientRect()` checks entirely from the `useScrollSpy` composable.
- Implement an `IntersectionObserver` that observes all DOM elements corresponding to the `sectionIds` array. Use `rootMargin: "-20% 0px -80% 0px"` to trigger active state changes when elements cross the 20% mark from the top of the viewport.
- **CRITICAL EDGE CASE:** Maintain the existing throttled Lenis scroll event listener *strictly* for the bottom-of-page check. Read the `scroll` and `limit` properties directly off the `lenisInstance`. If `scroll >= limit - 10`, force the active section to the last item in the array to handle short sections at the absolute bottom. Reading these properties does not trigger layout thrashing.
- Ensure all observers and event listeners disconnect properly on unmount to prevent memory leaks.

## Acceptance criteria

- [x] `getBoundingClientRect()` is removed from `useScrollSpy.ts`.
- [x] Side-navigation active state updates precisely when scrolling sections past the 20% viewport mark.
- [x] Side-navigation updates correctly when a link is clicked to jump programmatically.
- [x] When scrolling to the absolute bottom of the page, the last section (e.g. Contact) correctly becomes active, even if it is too short to reach the 20% mark.
- [x] Zero "Forced Reflow" or "Layout Thrashing" warnings appear in the Chrome DevTools Performance trace during scrolling.

## Notes on Failed Implementation

**Attempt:** We previously tried using `IntersectionObserver` with `rootMargin: "-20% 0px -79% 0px"`. 
**Why it failed:** 
- It caused a bug where scrolling up from "Contact" completely skipped the "Projects" section and highlighted "Experience" instead. This happened because the observer only tracked when boundaries crossed a 1% height line, failing to account for sections that were already fully occupying the screen below the line. 
- It did not satisfy the requirement of "highlighting the section that occupies the maximum part of the screen".

## Blocked by

None - can start immediately
