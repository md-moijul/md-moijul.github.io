# Context & Glossary

This document defines the ubiquitous language and core domain concepts used throughout the repository.

## Glossary

- **Data Store (`data.ts`)**: The centralized source of truth for all structured portfolio content. It is intentionally decoupled from the UI layer.
- **Experience**: A record of professional employment history. Currently, this strictly tracks formal employment and excludes freelance or ad-hoc jobs.
- **Project**: A distinct piece of technical work, encompassing both personal side-projects and formal educational projects, characterized by a specific tech stack and a descriptive summary.
- **Section**: A top-level vertical slice of the portfolio page (e.g., About, Experience, Projects). Sections are data-agnostic; they do not import data directly, but rather accept it via props from the orchestrating view.
- **UI Component**: A generic, "dumb", data-agnostic primitive (e.g., Button, Badge, Card). These live strictly in `src/components/ui/` and do not know about domain models like Projects or Experiences.
- **Feature Component**: A domain-specific component (e.g., `ProjectCard`, `ExperienceTimelineItem`) that understands the shape of domain models. These live alongside sections or in a dedicated `src/components/features/` folder, keeping `ui/` purely generic.
