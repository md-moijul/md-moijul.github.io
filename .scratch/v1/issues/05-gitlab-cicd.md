Status: ready-for-agent

## Parent
PRD-V1.md

## What to build
Create a `.gitlab-ci.yml` file using a Node/Vite build image to automate deployment to GitLab Pages. This ensures every push to the repository results in a live update of the portfolio.

## Acceptance criteria
- [ ] `.gitlab-ci.yml` file exists in the root directory.
- [ ] Configured with `pages` job and `artifacts` pointing to the `dist` (or `public`) directory.
- [ ] Build script correctly runs `npm install` and `npm run build`.
- [ ] Deployment triggers on every push to the default branch.

## Blocked by
- .scratch/v1/issues/01-routing-infrastructure.md
