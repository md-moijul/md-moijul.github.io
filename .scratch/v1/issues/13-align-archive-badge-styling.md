## Parent

RAW_TODO Item 10: "update the badges style inside /archive to be same as homepage projects badges"

## What to build

Align the styling of the badges in the Project Archive (`ArchiveView.vue`) with the homepage projects (`ProjectsSection.vue`). 

The homepage badges use the default `Badge` variant which has a `bg-white/20` background and transparent border. The archive badges currently use `variant="outline"` with `bg-black/20` and `border-border/50`.

The goal is to move the archive badges to the default variant (`bg-white/20`) while maintaining their compact sizing (`text-[10px]`, `py-0`, `px-2`).

## Acceptance criteria

- [x] `ArchiveView.vue` badges use the default `Badge` variant (no `variant="outline"` prop).
- [x] `ArchiveView.vue` badges use `bg-white/20` (achieved by removing `bg-black/20`).
- [x] `ArchiveView.vue` badges retain `text-[10px]`, `py-0`, and `px-2` classes for compactness.
- [x] `ArchiveView.vue` badges no longer have the `border-border/50` class.
- [x] Visual appearance in the archive matches the "glowy/white" feel of the homepage badges but at a smaller scale.

## Blocked by

None - can start immediately
