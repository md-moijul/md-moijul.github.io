# Extract `ArchiveProjectRow` Feature Component

## What to build
Introduce a domain-aware `ArchiveProjectRow` feature component that encapsulates the rendering, interactivity, and expanded state of an individual Project row in the Archive grid. The current `ArchiveView` is monolithic and mixes complex row markup and local "expanded" state management with its primary routing/layout responsibilities. This change extracts all row-level concerns, vastly simplifying the parent view.

## Acceptance criteria
- [x] `src/components/features/ArchiveProjectRow.vue` is created.
- [x] `ArchiveProjectRow.vue` accepts a single `project` prop (type `Project`).
- [x] The row layout, markup, `isExpanded` local state logic, and `useStackFilter()` interactions are moved from `ArchiveView.vue` into `ArchiveProjectRow.vue`.
- [x] The `expandedProjects` Set and associated state logic are completely removed from `ArchiveView.vue`.
- [x] `ArchiveView.vue` iterates over the `sortedProjects` data and renders `<ArchiveProjectRow :project="project" />`.

## Blocked by
None - can start immediately
