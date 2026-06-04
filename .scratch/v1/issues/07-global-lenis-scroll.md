Status: triage/ready-for-dev

## Parent
.scratch/v1/PRD.md

## What to build
Modify the application's scrolling architecture to use the global window instead of a specific `overflow-y-auto` container. This will resolve mobile navigation click failures and fix the bug where scrolling gets cut off before reaching the bottom of the page.

1.  **Remove Container Scrolling**: In `App.vue`, remove the `overflow-y-auto h-screen` constraints from the `<main>` element to allow the document body to scroll naturally.
2.  **Global Lenis Initialization**: In `useLenis.ts`, remove the explicit `wrapper` and `content` configurations when instantiating Lenis. Allow it to default to the `window` object.
3.  **Preserve Desktop Split-Pane**: Ensure the desktop visual layout remains identical. The `NavigationPanel` container in `App.vue` should act as a fixed/sticky sidebar (e.g., using `sticky top-0 h-screen`) while the right side content scrolls naturally within the window.
4.  **Verify ScrollTo**: Ensure programmatic navigation in `useScrollTo.ts` still correctly targets elements now that the scroll context is global.

## Acceptance criteria
- [ ] Lenis smooth scrolling operates on the global window.
- [ ] Clicking a nav link on mobile correctly scrolls to the target section.
- [ ] Reaching the bottom of the page via mouse scroll on mobile reveals the entire contact section without cutting off.
- [ ] The desktop layout still functions as a split-pane design (fixed left sidebar, scrolling right content).

## Blocked by
- .scratch/v1/issues/06-mobile-navbar.md
