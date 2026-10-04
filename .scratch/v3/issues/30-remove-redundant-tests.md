## What to build

Clean up the test suite by deleting brittle, CSS-coupled UI tests and shallow component tests that duplicate logic already verified by our core composables and domain functions. The goal is to remove maintenance overhead without losing any meaningful test coverage.

## Acceptance criteria

- [ ] Delete `src/components/ui/badge/Badge.test.ts` and `Card.test.ts`
- [ ] Delete feature tests: `ProjectCard.test.ts`, `ExperienceCard.test.ts`, `ArchiveProjectRow.test.ts`
- [ ] Delete section tests: `ProjectsSection.test.ts`, `ExperienceSection.test.ts`, `ContactSection.test.ts`
- [ ] Run `npm test` and verify that the remaining core tests (`useStackFilter`, `useScrollController`, routing, domain logic) all pass cleanly.

## Blocked by

None - can start immediately.
