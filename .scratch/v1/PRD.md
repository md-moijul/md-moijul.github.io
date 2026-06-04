# PRD: Personal Portfolio v1 - "The Professional Archive"

## Problem Statement
The current portfolio is "halfway there"—it has the core content but lacks a functional communication loop, dynamic visual interest for technical skills, and a comprehensive archive for recruiters to view the developer's full history. Additionally, there is no automated deployment pipeline to host the site for free on GitLab.

## Solution
Transition the site to a polished v1 by implementing a zero-backend contact form (EmailJS), a dynamic marquee effect for project tech stacks, and a dedicated "Project Archive" page. The site will be refactored to use Vue Router (Hash Mode) for stable, free hosting on GitLab Pages with an automated CI/CD pipeline.

## User Stories
1. **As a visitor**, I want to see a professional landing page that summarizes the developer's core skills and recent work.
2. **As a visitor**, I want to send a message via a contact form so I can discuss potential opportunities.
3. **As a visitor**, I want to receive an automatic confirmation email after submitting the contact form so I know my message was received.
4. **As the portfolio owner**, I want to receive an email notification when someone uses the contact form so I can respond promptly.
5. **As a recruiter**, I want to see a dynamic "tech stack" marquee for projects so I can quickly identify the technologies used without scrolling a long list.
6. **As a recruiter**, I want to see an "Archive" or "Full Project List" button that takes me to a comprehensive history of all projects.
7. **As a recruiter**, I want the project archive to be organized in a table format (Year, Project, Stack, Links) so I can scan it efficiently.
8. **As a visitor**, I want the website to be fully responsive so I can view it on my phone or tablet.
9. **As a visitor**, I want smooth transitions between sections and pages to feel a sense of high-quality craftsmanship.
10. **As a developer**, I want the site to deploy automatically to GitLab Pages whenever I push code to the repository.
11. **As a visitor**, I want to be able to refresh any page (like the Archive) without getting a 404 error from the host.

## Implementation Decisions
- **Routing:** Install `vue-router` and implement `createWebHashHistory` to ensure deep-linking works on static GitLab Pages hosting without server-side redirects.
- **Project Structure:** Refactor `App.vue` to act as a root layout containing a `<RouterView>`. Create `HomeView.vue` (for the main scrollable content) and `ArchiveView.vue` (for the project table).
- **Contact Loop:** Integrate the **EmailJS** SDK. Create a submission handler that manages "Sending", "Success", and "Error" states. No custom backend or serverless functions are required.
- **Marquee Component:** Develop a reusable `MarqueeContainer.vue`. It will use CSS `@keyframes` and a DOM-cloning strategy (multiplying the list of items) to create a seamless infinite loop. It must support a `pause-on-hover` state.
- **Project Archive:** Refactor the archive into a full-screen modal-style overlay. It will feature a sticky header (with "Go Back", title, and table headers) and a responsive project table including descriptions and icon-based links.
- **CI/CD:** Add a `.gitlab-ci.yml` file using a Node/Vite build image to automate the production build and deployment to the `public/` directory for GitLab Pages.

## Testing Decisions
- **Behavioral Testing:** Tests should focus on ensuring the user can navigate between the home page and the archive without broken links.
- **Form Validation:** Verify that the contact form prevents submission if required fields (email, message) are missing or invalid.
- **Data Integrity:** Ensure that adding a new entry to `data.ts` automatically updates both the Home page sections and the Archive table.
- **Responsiveness:** Manual verification of the Marquee and Archive Table on small-screen viewports.

## Out of Scope
- Building a custom backend for email handling (deferred in favor of EmailJS).
- "Project Detail" sub-pages for individual projects.
- Search/Filtering functionality within the Project Archive (kept to a simple table for v1).

## Further Notes
- The **Hash Mode** routing (`/#/archive`) is a specific technical requirement for GitLab Pages compatibility.
- EmailJS usage requires a Service ID, Template ID, and Public Key which the user will need to provide or set up in their dashboard.
