## What to build
Enhance the stack badge interaction on the `/archive` page. Instead of filtering projects out when a stack is selected, the list should re-order to move matching projects to the top.
- Maintain date-based sorting within the "matching" and "non-matching" groups.
- Ensure the state is still synced with the URL query parameters.
- Projects that don't match the selected stack should remain in the list but appear after all matching projects.

## Acceptance criteria
- [x] Projects with at least one matching stack move to the top of the archive list.
- [x] Projects within the matching group are sorted by date (newest first).
- [x] Projects within the non-matching group are sorted by date (newest first).
- [x] The re-ordering is reactive and updates immediately when stack badges are clicked.
- [x] URL synchronization for the `?stack=` parameter is maintained.

## Blocked by
None - can start immediately
