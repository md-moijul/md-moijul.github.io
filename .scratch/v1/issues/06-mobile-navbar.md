Status: triage/ready-for-dev

## Parent
.scratch/v1/PRD.md

## What to build
Restructure `NavigationPanel.vue` to provide a mobile-friendly layout while preserving the desktop view. 

On mobile (`< md` breakpoint):
1. Visually separate the Header (Name, Title, Bio) and Social Icons from the Navigation Links.
2. Render the Header and Social Icons at the top of the page in the normal document flow.
3. Convert the Navigation Links block into a horizontal list with horizontal scrolling enabled (`overflow-x-auto`) to handle smaller screens.
4. Apply `sticky top-0 z-50` (or similar) to the Navigation Links block so it docks to the top of the viewport when the user scrolls down.

On desktop (`>= md` breakpoint):
1. Maintain the existing vertical sidebar layout.

## Acceptance criteria
- [ ] On mobile, Name, Bio, and Social links appear at the top and scroll away naturally.
- [ ] On mobile, Navigation links (About, Experience, etc.) form a horizontal list below the header.
- [ ] On mobile, Navigation links stick to the top of the screen when scrolled past.
- [ ] On mobile, the Navigation link list is horizontally scrollable if the items exceed screen width.
- [ ] On desktop, the layout remains a fixed vertical sidebar.

## Blocked by
None - can start immediately
