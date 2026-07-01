# Extract `ProjectCard` Feature Component

## What to build
Introduce a domain-aware `ProjectCard` feature component that encapsulates the rendering and interactivity of a Project object. Currently, `ProjectsSection` handles both structural layout and the interactive stack filter logic. This change moves the interactivity and card UI down into the `ProjectCard`, allowing `ProjectsSection` to act purely as a structural orchestrator.

## Acceptance criteria
- [x] `src/components/features/ProjectCard.vue` is created.
- [x] `ProjectCard.vue` accepts a single `project` prop (type `Project`).
- [x] The `Card` layout, markup, and `useStackFilter()` interaction logic are moved from `ProjectsSection.vue` into `ProjectCard.vue`.
- [x] `ProjectsSection.vue` iterates over the projects data and renders `<ProjectCard :project="project" />`.

## Blocked by
None - can start immediately
