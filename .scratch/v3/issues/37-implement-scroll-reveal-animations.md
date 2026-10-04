## What to build

Implement subtle, highly performant CSS-based reveal animations that trigger on scroll and initial load. The animations should be strictly driven by Tailwind v4 utilities and a lightweight custom Vue `v-reveal` directive using `IntersectionObserver`, without polluting the bundle with heavy animation libraries (like GSAP or Framer Motion).

The specific animation behaviors required are:
1. **Name:** A staggered word-by-word fade-in for the name in the navigation panel on initial load.
2. **Bio:** A block slide-in for the bio text after the name finishes animating.
3. **About Section:** Staggered block slide-ins for the paragraphs.
4. **Cards (Experience/Projects):** When scrolling, the structural card outlines remain immediately visible, but the internal content (titles, descriptions, badges, roles) stagger-fade in as they enter the viewport.
5. **Navigation Brackets:** Smooth fade and slide-in for brackets `[]` on hover and active states in the navigation panel.

## Acceptance criteria

- [x] Implement a `vReveal` custom directive utilizing `IntersectionObserver` to add a `data-revealed="true"` attribute when elements enter the viewport.
- [x] Support a staggering mechanism for elements entering the viewport simultaneously.
- [x] Register the directive globally in `main.ts`.
- [x] Animate `MD Moijul Islam` word-by-word with a pure fade-in.
- [x] Animate the bio paragraph with a slight delay so it appears after the name.
- [x] Add staggered reveal animations to the `AboutSection` paragraphs.
- [x] Add staggered reveal animations to the internal text content of `ExperienceCard` and `ProjectCard` (keeping the card boundaries themselves static).
- [x] Implement smooth, bold, sliding bracket animations for active and hovered navigation items.

## Blocked by

None - can start immediately
