## What to build

Consolidate multiple experience entries for the same company into a single interactive card. This involves refactoring the data structure to support a collection of roles per company and updating the UI to display these roles in a stacked format with a unified description.

### Data Refactor
- Define `Role` interface: `{ title: string, startDate: Date, endDate: Date | 'present' }`.
- Update `Experience` interface to use `roles: Role[]`.
- Remove `projects` from `Experience`.
- Merge existing "Wilxite" entries into a single object with three roles and a consolidated description.

### UI Changes
- Update `ExperienceSection.vue` to iterate over `roles`.
- Display company name/location as the primary header.
- Stack job titles and date ranges clearly within the card.
- Remove project badge footer.

## Acceptance criteria

- [x] `src/assets/data.ts` uses the new `Experience` and `Role` interfaces.
- [x] Multiple roles for "Wilxite" are rendered within a single card in the Experience section.
- [x] Job titles and dates are displayed as a stacked list.
- [x] Project links/badges are removed from the Experience cards.
- [x] Unit tests in `ExperienceSection.test.ts` pass with the new data structure.

## Blocked by

None - can start immediately.
