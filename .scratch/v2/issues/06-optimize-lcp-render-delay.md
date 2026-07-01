## Parent

[Performance Baseline Report](file:///home/moijul/Downloads/personal/personal-portfolio/.scratch/performance/2026-07-01-baseline-report.md)

## What to build

Resolve the severe Largest Contentful Paint (LCP) delay of 22.4s. The performance trace shows a massive Render Delay. Ensure that the primary LCP element is discoverable early by the browser and is not blocked by complex client-side rendering logic or dependent on long main-thread tasks.

## Acceptance criteria

- [ ] Identify the main LCP element for the page.
- [ ] Ensure the LCP element's rendering is not blocked by client-side logic or delayed main-thread tasks.
- [ ] Rerun performance trace to verify LCP time is drastically improved and Render Delay is minimized.

## Blocked by

None - can start immediately
