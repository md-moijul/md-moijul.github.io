# Status: Completed

## Problem Statement

Based on the recent architecture review, the current codebase suffers from two primary "shallow" design issues that threaten long-term maintainability:
1. **Data Coupling in UI Sections:** Components like `ExperienceSection.vue` and `ProjectsSection.vue` directly import data from the global singleton `src/assets/data.ts`. This makes them tightly coupled, harder to test in isolation, and less reusable.
2. **Scroll Spy Logic Leaking:** The `NavigationPanel.vue` contains dense, raw DOM math (`getBoundingClientRect`) and tightly coupled listeners to `lenisInstance` to determine the active section. A View component should not be responsible for this complex state calculation.

## Solution

To deepen the architecture:
1. **Decouple Data via Props:** We will change `ExperienceSection` and `ProjectsSection` to accept their data via Vue props. `HomeView` will become responsible for importing `src/assets/data.ts` and passing it down.
2. **Extract `useScrollSpy` Composable:** We will extract the scroll intersection logic currently living in `NavigationPanel.vue` into a dedicated, testable composable (`src/composables/useScrollSpy.ts`). This composable will maintain the existing Lenis math but expose a clean, reactive `activeSection` ref.

## Commits

1. **chore: define types for data**
   - Extract TypeScript interfaces for `Experience` and `Project` into `src/assets/data.ts` and export them.
2. **refactor(ProjectsSection): decouple data import**
   - Update `ProjectsSection.vue` to accept `projects` as a prop.
   - Update `ProjectsSection.test.ts` to pass mock projects via props.
   - Update `HomeView.vue` to import projects and pass them to `<ProjectsSection />`.
3. **refactor(ExperienceSection): decouple data import**
   - Update `ExperienceSection.vue` to accept `experiences` as a prop.
   - Add `ExperienceSection.test.ts` to verify it renders the provided props.
   - Update `HomeView.vue` to import experiences and pass them to `<ExperienceSection />`.
4. **feat: create useScrollSpy composable**
   - Create `src/composables/useScrollSpy.ts`.
   - Move the `handleScroll`, Lenis event listener, and route watcher logic from `NavigationPanel.vue` into this file.
   - Export a reactive `activeSection` and a function to trigger the check manually.
5. **test: add useScrollSpy unit tests**
   - Create `src/composables/useScrollSpy.test.ts` to verify the math logic triggers the correct section updates in isolation.
6. **refactor(NavigationPanel): integrate useScrollSpy**
   - Update `NavigationPanel.vue` to remove the raw scroll logic and instead consume the new `useScrollSpy` composable.
   - Update `NavigationPanel.test.ts` to mock `useScrollSpy`.

## Decision Document

- **Data Passing:** Section components (`Experience`, `Projects`) will no longer know where their data comes from. `HomeView` acts as the orchestrator.
- **Scroll Logic:** We are keeping the existing Lenis scroll math because it was recently patched to fix bugs (Issue 01.2). We are strictly encapsulating it, not rewriting the math itself.
- **ArchiveView Handling:** As a top-level route component, `ArchiveView` is acceptable as a data-importer. We will leave `ArchiveView` importing from `data.ts` directly, as it acts similarly to `HomeView` (as a page orchestrator).

## Testing Decisions

- We test external behavior: components must render the data provided in props, regardless of where it came from.
- `ExperienceSection` will gain full test coverage.
- The `useScrollSpy` logic will be tested independently of Vue components, making tests faster and less brittle compared to testing scroll events inside `NavigationPanel.test.ts`.

## Verification Results

- **Unit Tests:** `npm test` passed with 28/28 tests successful.
- **Data Flow:** Verified that `ExperienceSection` and `ProjectsSection` receive data via props in `HomeView`.
- **Scroll Spy:** Verified `useScrollSpy` correctly tracks `activeSection` and is consumed by `NavigationPanel`.
- **Types:** Exported `Project` and `Experience` interfaces from `data.ts` and updated `GEMINI.md` to mandate their use.

## Out of Scope

- Changing the visual design or layout of the sections.
- Changing the actual content in `data.ts`.
- Replacing Lenis with standard CSS scroll snapping.