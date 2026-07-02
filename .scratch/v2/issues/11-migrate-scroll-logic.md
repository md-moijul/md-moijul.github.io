## Parent

10-create-scroll-controller.md

## What to build

Consolidate the existing scrolling and spy composables into the new `useScrollController`, ensuring full behavioral parity while achieving architectural depth.

- Migrate the programmatic scrolling logic (including the hardcoded `vue-router` logic for cross-page navigation) into `useScrollController`.
- Migrate the `IntersectionObserver` spy logic into `useScrollController` and make it optional via a `spySections` array argument.
- Update `NavigationPanel.vue` and `MobileNav.vue` to use `useScrollController()` to trigger scrolls and read the `activeSection`.
- Delete `src/composables/useLenis.ts`, `src/composables/useScrollTo.ts`, and `src/composables/useScrollSpy.ts`.

## Acceptance criteria

- [x] Programmatic scrolling works across pages (e.g., clicking 'Projects' from the Archive page redirects to Home and scrolls).
- [x] The active section in the navigation panels updates correctly as the user scrolls the Home page.
- [x] `ArchiveView.vue` continues to scroll correctly without invoking the unused `IntersectionObserver` spy logic.
- [x] The old shallow composables (`useLenis`, `useScrollTo`, `useScrollSpy`) are completely deleted.

## Blocked by

- 10-create-scroll-controller.md
