Status: ready-for-agent

## Parent
PRD-V1.md

## What to build
Implement `ArchiveView.vue` featuring a responsive table (Year, Project, Stack, Links) populated from `src/assets/data.ts`. Add a "View Archive" button to the `ProjectsSection` on the Home page to link to this new view.

## Acceptance criteria
- [ ] `ArchiveView.vue` component created with a data-driven table.
- [ ] Table columns: Year, Project, Stack (badges), and Links (GitHub/Live).
- [ ] Responsive design: Table remains readable on mobile (horizontal scroll or card layout).
- [ ] "View Full Project Archive" button added to `ProjectsSection.vue`.
- [ ] Clicking the button navigates to `/#/archive`.

## Blocked by
- .scratch/v1/issues/01-routing-infrastructure.md
