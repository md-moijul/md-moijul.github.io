## What to build

Remove the hidden global state dependency from the project feature components to make them purely data-driven, adhering strictly to the Feature Component architectural boundary.

- Remove the `useStackFilter` import and usage from `src/components/features/ProjectCard.vue` and `src/components/features/ArchiveProjectRow.vue`.
- Update both components to accept the active filter state and a toggle handler function via props (or emit events).
- Move the `useStackFilter` initialization up to their orchestrating parents: `src/components/sections/ProjectsSection.vue` and `src/views/ArchiveView.vue`.
- Pass the necessary state/handlers down to the child feature components.

## Acceptance criteria

- [x] `ProjectCard` and `ArchiveProjectRow` no longer import or initialize `useStackFilter`.
- [x] Clicking a tech badge on a project card on the Home page successfully toggles the active stack filter.
- [x] Clicking a tech badge on a project row on the Archive page successfully toggles the active stack filter.
- [x] The components can be tested entirely by passing props without needing to mock the global composable state.

## Blocked by

None - can start immediately
