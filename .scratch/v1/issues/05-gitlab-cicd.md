Status: completed

## Parent
PRD-V1.md

## What to build
Create a GitHub Actions workflow in `.github/workflows/deploy.yml` to automate deployment to GitHub Pages. This ensures every push to the `main` branch results in a live update of the portfolio.

## Acceptance criteria
- [x] `.github/workflows/deploy.yml` file exists.
- [x] Configured with `deploy` job using `actions/deploy-pages`.
- [x] Build script correctly runs `npm ci` and `npm run build`.
- [x] Deployment triggers on every push to the `main` branch.
- [x] `vite.config.ts` updated with `base: './'` for correct routing.

## Blocked by
- .scratch/v1/issues/01-routing-infrastructure.md
