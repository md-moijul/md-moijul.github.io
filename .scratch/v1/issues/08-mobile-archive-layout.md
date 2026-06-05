Status: status/done

## Parent
.scratch/v1/PRD.md

## What to build
Redesign the `/archive` view layout for mobile screens so it smartly breaks down into a stacked card layout instead of maintaining a forced tabular view with a horizontal scrollbar.

1.  **Mobile Card Layout (`< lg`)**: Update `ArchiveView.vue` to drop the CSS grid (`grid-cols-*`) for the main rows on smaller screens. Transform the layout into vertical flex or grid cards.
2.  **Card Structure**: Each project card should display:
    - Top line: Year and Link icons.
    - Second line: Project Name.
    - Third line: Description text.
    - Bottom line: Tech stack badges.
3.  **Remove Scroll Container**: Remove or override the `min-w-[900px]` and `overflow-x-auto` classes on mobile so the content flows naturally downwards.
4.  **Desktop View (`>= lg`)**: Retain the existing 5-column tabular grid with sticky headers on larger screens. Hide the table headers on mobile.

## Acceptance criteria
- [x] On mobile, the archive view displays projects as a vertical list of cards.
- [x] On mobile, there is no horizontal scrollbar on the main content container.
- [x] On mobile, the table headers (Year, Project, Description, Stack, Links) are hidden.
- [x] On desktop (`>= lg`), the layout remains a 5-column tabular grid.

## Blocked by
None - can start immediately
