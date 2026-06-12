## Parent
Raw Capture: TODO.md item 5

## What to build
Implement an interactive URL-synced "sparkly" badge feature with refined visuals and interactions. 
- Refine the "sparkly" visual variant in the `Badge` component:
    - Make the animation more subtle (e.g., slower rotation or more transparent gradient).
    - Ensure it has a visible border.
- Update the interaction logic for stack badges in `ProjectsSection.vue` and `ArchiveView.vue`:
    - **Single Click:** Toggle the technology name in the `stack` query parameter (add if absent, remove if present).
- Maintain synchronization across views.

## Acceptance criteria
- [x] The `Badge` component has a "sparkly" visual variant driven by CSS `conic-gradient`.
- [x] The sparkly variant is refined to be more subtle and includes a visible border.
- [x] Badges in `ProjectsSection` and `ArchiveView` handle single-click toggling.
- [x] Single click adds or removes the badge's technology from the `?stack=` URL query parameter.
- [x] State remains synchronized and visually highlighted correctly across both views when the URL updates.

## Blocked by
None - can start immediately
