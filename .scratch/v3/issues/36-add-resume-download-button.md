## What to build

Add a "Download Resume" button to the `NavigationPanel.vue` component to allow visitors to download the resume directly from the sidebar.

- **Asset Management**: Ensure the provided resume PDF is placed in the `public/` directory (e.g., renamed to `public/resume.pdf` for a cleaner URL) so it can be served correctly as a static download.
- **Placement**: Add the download button below the short introductory paragraph ("I build high-performance...") in `NavigationPanel.vue`.
- **Design**: The button should look like a secondary action (e.g., an outline button with a border and subtle hover effect) matching the dark theme. It should also include a download icon from `lucide-vue-next` for better visual communication.

## Acceptance criteria

- [x] The resume PDF is located in the `public/` directory.
- [x] A "Download Resume" link/button is added to `NavigationPanel.vue` immediately below the bio paragraph.
- [x] The button is an `<a>` tag with the `href` pointing to the public PDF path. 
- [x] The button includes the `target="_blank"` and `rel="noopener noreferrer"` attributes (and optionally the `download` attribute).
- [x] The button incorporates the `Download` icon from `lucide-vue-next`.
- [x] The button styling is polished, responsive, and matches the portfolio's aesthetic.

## Blocked by

None - can start immediately
