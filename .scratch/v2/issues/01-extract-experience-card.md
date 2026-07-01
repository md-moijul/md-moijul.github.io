# Extract `ExperienceCard` Feature Component

## What to build
Introduce a domain-aware `ExperienceCard` feature component that fully encapsulates the rendering of an individual Experience object. The current `ExperienceSection` is shallow and bloated with inline UI details; this change establishes a firm boundary where `ExperienceSection` handles only structural layout and delegates rendering to `ExperienceCard`.

## Acceptance criteria
- [x] `src/components/features/ExperienceCard.vue` is created.
- [x] `ExperienceCard.vue` accepts a single `experience` prop (type `Experience`).
- [x] The `Card` layout and markup for an experience is moved from `ExperienceSection.vue` into `ExperienceCard.vue`.
- [x] `ExperienceSection.vue` iterates over the experiences data and renders `<ExperienceCard :experience="experience" />`.

## Blocked by
None - can start immediately
