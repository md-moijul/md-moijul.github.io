---
title: Optimize Mobile JS Payload via Async Components
type: AFK
---

## What to build

Refactor the main landing page to lazy-load below-the-fold content using Vue's `defineAsyncComponent`. 

Currently, the entire application's components (Experience, Projects, Contact, and MobileNav) are bundled and executed synchronously on initial load. This blocks the main thread on mobile devices, resulting in a high Total Blocking Time (TBT) and delaying the First Contentful Paint (FCP). By splitting these into async components, we dramatically reduce the initial JavaScript bundle size.

## Acceptance criteria

- [x] `HomeView.vue` uses `defineAsyncComponent` for `ExperienceSection`, `ProjectsSection`, and `ContactSection` instead of static imports.
- [x] `App.vue` uses `defineAsyncComponent` for `MobileNav` since it is initially hidden behind a hamburger menu.
- [x] The Vite build (`npm run build`) outputs multiple chunked `.js` files instead of a single monolithic chunk.
- [x] The initial mobile FCP and TBT in a Lighthouse audit are significantly reduced.

## Blocked by

None - can start immediately
