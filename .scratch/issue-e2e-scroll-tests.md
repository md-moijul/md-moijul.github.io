## What to build

Introduce Playwright to run real-browser End-to-End tests specifically targeting the portfolio's scroll layout and navigation state. Because the app relies heavily on `Lenis` smooth scrolling and `IntersectionObserver` for section highlighting, these cannot be safely tested in JSDOM. This slice will set up the tooling and write the core critical path test to protect the layout from future regressions.

## Acceptance criteria

- [ ] Install `@playwright/test` as a dev dependency and configure it for the Vite local server.
- [ ] Write a test that verifies clicking a navigation link smoothly scrolls the page to the correct section.
- [ ] Write a test that verifies manual scrolling updates the active section highlight in the navigation panel (testing the Intersection Observer).
- [ ] Write a test that verifies cross-route navigation (starting on `/archive`, clicking a section link, routing to `/`, and scrolling to the target).
- [ ] Add an `npm run test:e2e` script to `package.json`.

## Blocked by

None - can start immediately.
