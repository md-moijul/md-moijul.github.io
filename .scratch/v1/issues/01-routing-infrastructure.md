Status: ready-for-agent

## Parent
PRD-V1.md

## What to build
Install `vue-router` and configure it with Hash Mode (`createWebHashHistory`) for GitLab Pages compatibility. Refactor `App.vue` into a root layout with `<RouterView>` and move existing section content into a new `HomeView.vue`. This ensures the site is ready for multi-page navigation while preserving existing functionality and smooth scrolling.

## Acceptance criteria
- [ ] `vue-router` installed and configured in `main.ts`.
- [ ] `App.vue` refactored to use `<RouterView>`.
- [ ] `HomeView.vue` created and contains current landing page sections (`About`, `Experience`, `Projects`, `Contact`).
- [ ] Navigation links in `NavigationPanel.vue` (if any) or scroll logic updated to work with the new structure.
- [ ] Hash mode is verified to be active (e.g., URL contains `/#/`).

## Blocked by
None - can start immediately
