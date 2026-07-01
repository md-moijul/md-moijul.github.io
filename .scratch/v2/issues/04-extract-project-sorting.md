# Extract Project Sorting Domain Logic

## What to build
Extract the pure domain logic that handles project sorting out of the Vue UI layer. Currently, the business rules for sorting projects (Tier 1: Stack Match, Tier 2: Date) are embedded directly inside a `computed` property in `ArchiveView.vue`. This leaks domain logic into the presentation layer and makes the sorting rules difficult to unit test independently.

## Acceptance criteria
- [x] `src/lib/domain/project.ts` is created.
- [x] A pure function `sortProjectsByStackAndDate(projects: Project[], activeStacks: string[]): Project[]` is exported from the new module.
- [x] The sorting logic (stack matching and date comparison) is moved out of `ArchiveView.vue` and into this new function.
- [x] `ArchiveView.vue` imports this function and uses it inside its `sortedProjects` computed property.

## Blocked by
None - can start immediately (though recommended to be implemented after `03-extract-archive-project-row.md` to avoid Git merge conflicts on `ArchiveView.vue`).
