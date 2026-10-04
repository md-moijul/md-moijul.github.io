## What to build

With the spy and routing logic extracted, the remaining scroll logic is purely a wrapper around `Lenis`. Rename this to `useSmoothScroll` to reflect its focused responsibility, and replace the failing, brittle unit tests with clean tests that don't trigger Vue lifecycle warnings.

## Acceptance criteria

- [x] Rename `useScrollController.ts` to `useSmoothScroll.ts` (and update all imports).
- [x] Delete `useScrollController.test.ts`.
- [x] Write a simple unit test for `useSmoothScroll.ts` that safely mocks Lenis without triggering unhandled rejections or `onMounted` warnings.
- [x] Run `npm run test` and verify the suite is 100% green with no console warnings or unhandled rejections.

## Blocked by

- Extract Cross-Page Scroll Routing
