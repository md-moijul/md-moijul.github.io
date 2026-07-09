## What to build

Establish the core `useScrollController` module that supports both a global (singleton) and local (target-based) Lenis smooth-scrolling instance.

- Create `src/composables/useScrollController.ts`. It should maintain and export a singleton `lenisInstance` by default if no arguments are passed. However, if a DOM target `Ref` is provided as an argument, it should instantiate and return an isolated local `Lenis` instance instead.
- Migrate `App.vue` to initialize the global singleton using `useScrollController()`.
- Migrate `ArchiveView.vue` to initialize a local instance using `useScrollController(scrollContainer)`, completely removing its custom `requestAnimationFrame` loop.

## Acceptance criteria

- [x] `useScrollController` correctly maintains a global singleton when no target is passed.
- [x] `ArchiveView.vue` uses `useScrollController` to handle its scrolling and no longer has a custom `requestAnimationFrame` loop.
- [x] The global scroll behaves exactly as it did before.

## Blocked by

None - can start immediately
