## What to build

Implement preloaded async components for the main page sections (`ExperienceSection`, `ProjectsSection`, `ContactSection`) and the `MobileNav`. This involves refactoring `HomeView.vue` and `App.vue` to use Vue's `defineAsyncComponent` so the JavaScript bundle is split into smaller chunks, alleviating main-thread CPU blocking (high TBT). Concurrently, configure Vite or use explicit imports/preloads to eagerly preload these chunks to prevent network waterfalls and preserve the excellent LCP score.

## Acceptance criteria

- [ ] `ExperienceSection`, `ProjectsSection`, and `ContactSection` in `HomeView.vue` are imported using `defineAsyncComponent`.
- [ ] `MobileNav` in `App.vue` is imported using `defineAsyncComponent`.
- [ ] The async chunks are eagerly preloaded so they do not cause a network waterfall.
- [ ] A Lighthouse audit confirms TBT is significantly reduced and LCP remains >90.

## Blocked by

None - can start immediately
