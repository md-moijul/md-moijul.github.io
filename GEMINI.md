# Personal Portfolio - GEMINI.md

This project is a personal portfolio website built with **Vue 3**, **TypeScript**, and **Vite**, using **Tailwind CSS v4** for styling and **Lenis** for smooth scrolling.

## Project Overview

- **Frontend Framework:** Vue 3 (Composition API with `<script setup>`)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **Icons:** Lucide Vue Next
- **Smooth Scrolling:** Lenis (via a custom composable `useLenis`)
- **Build Tool:** Vite

The application is structured as a single-page layout with a sticky navigation/info panel on the left (on desktop) and a scrollable content area on the right containing various sections.

## Directory Structure

- `src/assets/`: Contains static assets and `data.ts` which holds the content for experiences and projects.
- `src/components/`:
    - `sections/`: Individual page sections (About, Experience, Projects, Contact).
    - `ui/`: Reusable UI components (Badge, Button, Card, Input, Textarea).
    - `NavigationPanel.vue`: The main sidebar/navigation component.
- `src/composables/`: Vue composables, including `useLenis.ts` for scrolling logic.
- `src/lib/`: Utility functions (e.g., `utils.ts` for tailwind-merge and clsx).

## Building and Running

### Development
Starts the Vite development server.
```bash
npm run dev
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
- **Navigation:** Navigation is handled programmatically via the `scrollToSection` function in `NavigationPanel.vue`.
- **Smooth Scrolling:** Powered by **Lenis**. A shared `lenisInstance` is exposed via `useLenis.ts` for programmatic scroll control.
- **Cross-Page Support:** When navigating to a section from a non-home route, the application redirects to `/` and then triggers a smooth scroll to the target section.
- **Active Highlighting:** Section highlighting in the navigation panel is managed via `IntersectionObserver`.

## Development Conventions

- **Component Pattern:** Use `<script setup lang="ts">` for all Vue components.
- **Styling:** Use Tailwind CSS utility classes. Prefer the `@/` alias for imports from the `src` directory.
- **Data Management:** Most of the portfolio content (experiences, projects) is stored in `src/assets/data.ts`. Update this file to add or modify entries.
- **UI Components:** New generic UI components should be added to `src/components/ui` following the existing pattern (typically a component file and an `index.ts` for exports).
- **Smooth Scrolling:** Lenis is initialized in `App.vue` via the `useLenis` composable. For programmatic scrolling, use the exported `lenisInstance` from `@/composables/useLenis`. Any scroll-related interactions should be compatible with Lenis.

## Key Files

- `src/App.vue`: Main layout and entry point for the component tree.
- `src/assets/data.ts`: Centralized data store for projects and work experience.
- `vite.config.ts`: Vite configuration, including Tailwind v4 plugin and path aliases.
- `src/style.css`: Global styles and Tailwind imports.
