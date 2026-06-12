## What to build

Implement logic to detect the `from` query parameter in the URL (e.g., `?from=linkedin`). Once detected, the application should ensure it is tracked (handled automatically by Umami's script if the page is loaded with it) and then immediately remove the parameter from the browser's address bar without triggering a page reload. This keeps the URL clean while still allowing the owner to see where traffic is coming from.

## Acceptance criteria

- [x] The application checks for a `from` query parameter on initial load.
- [x] If `from` is present, the parameter is removed from the URL using `window.history.replaceState` or Vue Router's navigation methods.
- [x] The "cleaning" process does not cause a page refresh or break the navigation flow (e.g., smooth scroll or routing).
- [x] Verified that the cleanup happens AFTER the initial page load so Umami can capture the parameter.

## Blocked by

- Issue 14: Umami Analytics Setup
