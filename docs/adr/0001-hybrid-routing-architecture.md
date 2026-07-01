# 1. Hybrid Routing Architecture

Date: 2026-07-01

## Status

Accepted

## Context

The primary view of the portfolio is designed as a single-page scrolling layout. However, the application also supports secondary pages (e.g., `/archive`) and is designed for future expansions. This creates a tension: standard anchor links (`href="#experience"`) work well for the home page, but they fail or act unpredictably when a user clicks them from a secondary page. Furthermore, we want to maintain the premium feel of smooth scrolling (powered by Lenis) across these transitions.

## Decision

We decided to use `vue-router` (with `createWebHashHistory`) to manage navigation, implementing a "hybrid" routing architecture:
1. Navigation is handled programmatically rather than via standard native `href` links.
2. When navigating to a home page section from the home route, we trigger the Lenis smooth scroll instance.
3. When navigating to a home page section from a *non-home* route (e.g., from `/archive`), the router first redirects to `/`, waits for the DOM, and then executes the smooth scroll to the target section.

## Consequences

- **Positive:** We maintain a single-page feel on the home route while cleanly supporting an expanding number of secondary pages.
- **Positive:** Deep linking and cross-page navigation work reliably with our custom Lenis smooth scrolling setup.
- **Negative:** Increased complexity in the navigation logic compared to native anchor tags.
