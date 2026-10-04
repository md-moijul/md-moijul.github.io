## What to build

Remove cross-page navigation side-effects from the scroll engine. Currently, the scroll controller intercepts requests, forces a `router.push("/")`, and uses multiple `nextTick()` hacks to wait for layout before scrolling. This logic belongs in the UI navigation layer. The scroll composable should be "dumb" and only scroll when told to.

## Acceptance criteria

- [x] Remove `router.push` and `route.path` checks from the scroll composable.
- [x] Update `NavigationPanel` and `MobileNav` to handle the routing: if not on `/`, they should `router.push("/")`, wait for the navigation to complete, and then call the scroll function.
- [x] Run `npm run test:e2e` and verify the "Cross-route navigation on mobile" test still passes perfectly.

## Blocked by

- Extract Section Spy

