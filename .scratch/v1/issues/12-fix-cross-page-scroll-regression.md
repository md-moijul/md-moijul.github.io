## Parent

- .scratch/v1/issues/11.3-navigation-scroll-integrity.md

## What to build

Investigate and fix the regression in smooth scroll behavior when navigating from the `/archive` page back to specific sections on the homepage. This feature was previously implemented in Issue 11.3 but has regressed.

The fix should ensure that clicking a navigation link (e.g., "Experience") while on `/archive` correctly redirects to `/` and then triggers a smooth scroll to the target section using Lenis.

**Note:** You may consider refactoring the whole Lenis scroll implementation if there is a clear benefit (e.g., improved stability or cleaner integration with `vue-router`), but prioritize maintaining the stability of the homepage scrolling state.

## Acceptance criteria

- [x] Navigating from `/archive` to a homepage section (About, Experience, Projects, Contact) via the navigation links triggers a smooth scroll to the correct section.
- [x] The transition from `/archive` to `/` is seamless, and the scroll target is accurate after the route change.
- [x] Homepage smooth scrolling and active section highlighting (ScrollSpy) remain fully functional and stable.
- [x] If a refactor of the Lenis implementation is performed, it must be justified by clear benefits and verified against all existing scroll behaviors.

## Blocked by

- None - can start immediately
