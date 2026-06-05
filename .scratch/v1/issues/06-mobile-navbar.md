Status: completed

## Parent

.scratch/v1/PRD.md

## What to build

Implement a mobile-only floating navigation menu that provides access to sections on the Home page from anywhere in the app (including the Archive page).

On mobile (`< md` breakpoint):

1. **Floating Action Button (FAB):** A fixed round button at the bottom right of the viewport (`fixed bottom-8 right-8`).
2. **Bottom Sheet Menu:** Clicking the FAB opens a full-width slide-up menu from the bottom.
3. **Merging UI Effect:** When open, the FAB loses its border/shadow to appear as part of the drawer.
4. **Active Highlighting:** Current section highlighted with `[SECTION]` style.
5. **Archive Integration:** FAB available on `/archive`; clicking links navigates to Home and scrolls.
6. **Sidebar Cleanup:** Navigation links hidden in `NavigationPanel.vue` on mobile.

On desktop (`>= md` breakpoint):

1. Floating menu and zoom effects are hidden.

## Acceptance criteria

- [x] FAB is visible on mobile and positioned bottom-right.
- [x] Drawer opens as a full-width bottom sheet with symmetric rounding (`rounded-t-3xl`).
- [x] FAB "merges" into the drawer (no border/shadow) when open.
- [x] Menu links correctly highlight active section and handle cross-page navigation.
- [x] Original sidebar navigation links are hidden on mobile.

## Blocked by

- None
