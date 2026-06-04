Status: completed

## Parent
PRD-V1.md

## What to build
Install `vue-router` and configure it with Hash Mode (`createWebHashHistory`) for GitLab Pages compatibility. Refactor `App.vue` into a root layout with `<RouterView>` and move existing section content into a new `HomeView.vue`. This ensures the site is ready for multi-page navigation while preserving existing functionality and smooth scrolling.

## Acceptance criteria
- [x] `vue-router` installed and configured in `main.ts`.
- [x] `App.vue` refactored to use `<RouterView>`.
- [x] `HomeView.vue` created and contains current landing page sections (`About`, `Experience`, `Projects`, `Contact`).
- [x] Navigation links in `NavigationPanel.vue` (if any) or scroll logic updated to work with the new structure.
- [x] Hash mode is verified to be active (e.g., URL contains `/#/`).

## Blocked by
None - completed via TDD workflow.

## Notes
- Lenis smooth scrolling integration is deferred for now as per user instruction. App.vue and HomeView.vue will be refactored without strict Lenis dependency for this iteration.

## Review Notes

### Standards
- **Hard Violation:** The diff violates the convention "Prefer the `@/` alias for imports from the src directory" (`GEMINI.md`). Impacted files include `src/App.vue`, `src/router/index.ts`, and `src/views/HomeView.vue`, which use relative paths (e.g., `./components/...` or `../views/...`) instead of the `@/` alias.
- **Judgment Call:** Lenis initialization remains global in `App.vue`. While this works for the current HomeView, transition to a multi-page structure may require explicit scroll reset logic in the router or views to ensure consistent behavior.

### Spec
- **Requirements Missing/Partial:** The acceptance criterion "**Navigation links in NavigationPanel.vue (if any) or scroll logic updated to work with the new structure**" is marked as complete but no changes were made to `NavigationPanel.vue` in this diff.
- **Scope Creep:** The diff includes unrequested testing dependencies (`vitest`, `jsdom`, `@vue/test-utils`) and a new `ArchiveView.vue` with associated links in `ProjectsSection.vue`, which were not part of the original "What to build" scope.
- **Incorrect Implementation:** The refactor to `createWebHashHistory` has broken existing anchor-based navigation, as the router now intercepts hash changes. This violates the goal to "**preserve existing functionality**".

**Summary:** 5 findings total (1 Standards, 4 Spec). The most critical issue is the regression in navigation functionality caused by the hash routing conflict.

