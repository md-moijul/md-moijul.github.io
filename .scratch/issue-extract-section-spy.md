## What to build

Extract the `IntersectionObserver` logic out of the scroll engine and into a dedicated `useSectionSpy` composable. This module should solely be responsible for determining which section is currently visible on the screen and returning the `activeSection` ref. It should have no dependency on Lenis or Vue Router.

## Acceptance criteria

- [x] Create `src/composables/useSectionSpy.ts`.
- [x] Move the `IntersectionObserver` logic from the current controller into this new composable.
- [x] Update components (like `NavigationPanel`) to consume `activeSection` from the new spy composable.
- [x] Run `npm run test:e2e` and verify the "manual scrolling updates the active section highlight" test still passes.

## Blocked by

None - can start immediately.
