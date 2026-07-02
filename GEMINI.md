# Personal Portfolio - GEMINI.md

This project is a personal portfolio website built with **Vue 3**, **TypeScript**, and **Vite**, using **Tailwind CSS v4** for styling and **Lenis** for smooth scrolling.

## Project Overview

- **Frontend Framework:** Vue 3 (Composition API with `<script setup>`)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **Icons:** Lucide Vue Next
- **Smooth Scrolling:** Lenis (via a custom composable `useScrollController`)
- **Build Tool:** Vite

The application is structured as a single-page layout with a sticky navigation/info panel on the left (on desktop) and a scrollable content area on the right containing various sections.

## Directory Structure

- `src/assets/`: Contains static assets and `data.ts` which holds the content for experiences and projects.
- `src/components/`:
    - `sections/`: Individual page sections (About, Experience, Projects, Contact).
    - `ui/`: Reusable UI components (Badge, Button, Card, Input, Textarea).
    - `NavigationPanel.vue`: The main sidebar/navigation component.
- `src/composables/`: Vue composables, including `useScrollController.ts` for smooth scroll initialization, programmatic scrolling, and active section tracking via IntersectionObserver.
- `src/lib/`: Utility functions (e.g., `utils.ts` for tailwind-merge and clsx).

## Building and Running

### Development
Starts the Vite development server.
```bash
npm run dev
```

### Testing
Runs unit and integration tests using **Vitest**.
```bash
npm test
```

### Production Build
Builds the application for production using `vue-tsc` for type checking and Vite for bundling.
```bash
npm run build
```

### Preview
Previews the production build locally.
```bash
npm run preview
```

## Routing and Navigation

- **Router:** Uses `vue-router` with `createWebHashHistory`.
- **Navigation:** Navigation is handled programmatically via the `scrollToSection` function from the `useScrollController` composable.
- **Smooth Scrolling:** Powered by **Lenis**. A shared `lenisInstance` is managed and exposed via `useScrollController.ts`. For local scrolling contexts (like Archive), `useScrollController({ target })` can be used to isolate smooth scrolling.
- **Cross-Page Support:** When navigating to a section from a non-home route, the `scrollToSection` logic redirects to `/` and then triggers a smooth scroll to the target section after the DOM stabilizes.
- **Active Highlighting:** Section highlighting in the navigation panel is managed via the `useScrollController` composable by passing `{ spySections: [...] }`, which uses an IntersectionObserver to detect the active section.

## Development Conventions

- **Component Pattern:** Use `<script setup lang="ts">` for all Vue components.
- **Data Decoupling:** Page sections (e.g., `ExperienceSection`, `ProjectsSection`) should be decoupled from data sources. They should accept data as props rather than importing directly from `src/assets/data.ts`. `HomeView` acts as the orchestrator for the main landing page.
- **Styling:** Use Tailwind CSS utility classes. Prefer the `@/` alias for imports from the `src` directory.
- **Data Management:** Most of the portfolio content (experiences, projects) is stored in `src/assets/data.ts`. Update this file to add or modify entries. Use the exported `Experience` and `Project` interfaces for type safety.
- **UI Components:** New generic UI components should be added to `src/components/ui` following the existing pattern (typically a component file and an `index.ts` for exports).
- **Smooth Scrolling:** Lenis is initialized globally via the `useScrollController` composable. For programmatic scrolling and active section tracking, use `useScrollController({ spySections })`. For local scrolling contexts, use `useScrollController({ target })` to isolate smooth scrolling. Any scroll-related interactions should be compatible with Lenis.

## Key Files

- `src/App.vue`: Main layout and entry point for the component tree.
- `src/assets/data.ts`: Centralized data store for projects and work experience.
- `vite.config.ts`: Vite configuration, including Tailwind v4 plugin and path aliases.
- `src/style.css`: Global styles and Tailwind imports.
