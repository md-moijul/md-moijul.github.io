---
title: Remove asynchronous component waterfalls (Static Imports)
type: AFK
---

## What to build

Refactor `HomeView.vue` and `App.vue` to replace `defineAsyncComponent` and `requestIdleCallback` logic with standard static ES imports for the main page sections (`ExperienceSection`, `ProjectsSection`, `ContactSection`, and `MobileNav`). This eliminates the sequential network dependency chain ("waterfall") that delays the loading of below-the-fold content on throttled mobile connections. The goal is to return to a monolithic initial JS bundle that the browser can fetch efficiently in a single request.

## Acceptance criteria

- [x] Refactor `src/views/HomeView.vue` to statically import `ExperienceSection`, `ProjectsSection`, and `ContactSection`.
- [x] Remove `defineAsyncComponent` from `HomeView.vue`.
- [x] Remove the `requestIdleCallback` logic and the `isLoaded` conditional rendering wrapper in `HomeView.vue`.
- [x] Refactor `src/App.vue` to statically import `MobileNav` and remove `defineAsyncComponent` for it.
- [x] Verify that the application successfully builds and all content is visible on initial load without delays.

## Blocked by

None - can start immediately
