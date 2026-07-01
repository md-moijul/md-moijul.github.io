## Parent

[Performance Baseline Report](file:///home/moijul/Downloads/personal/personal-portfolio/.scratch/performance/2026-07-01-baseline-report.md)

## What to build

Address the high Total Blocking Time (TBT) of ~7.18s and layout thrashing issues identified in the baseline report. Investigate the codebase for long-running main thread tasks during initial load and synchronous DOM reads/writes that trigger Forced Reflow events. Optimize these areas by batching DOM interactions, leveraging `requestAnimationFrame`, or breaking up long JavaScript tasks to improve initial page responsiveness.

## Acceptance criteria

- [x] Audit components and eliminate synchronous DOM reads/writes causing forced reflows.
- [x] Identify and break up or defer long tasks blocking the main thread during initial load.
- [x] Rerun performance trace to verify TBT is significantly reduced and "Forced Reflow" warnings are resolved.

## Blocked by

None - can start immediately
