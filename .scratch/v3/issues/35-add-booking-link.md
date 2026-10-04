## What to build

Add a "Book a meeting" link to the `ContactSection.vue` component to allow visitors to easily schedule a meeting via Google Calendar. 

The link should be placed as a subtitle paragraph directly below the "Get in Touch" `<h2>` heading. It should be styled elegantly to match the site's aesthetic (e.g., using Tailwind utilities like `text-white/70`, with an `underline`, and `hover:text-white transition-colors`) and it must open in a new tab.

Suggested text: "Send me a message below or [book a meeting]."
Target URL: `https://calendar.app.google/KAq3kFJ7MSNAFwfN7`

## Acceptance criteria

- [x] A subtitle paragraph is added immediately below the "Get in Touch" heading in `ContactSection.vue`.
- [x] The paragraph contains a hyperlink saying "book a meeting" pointing to the provided Google Calendar URL.
- [x] The link includes `target="_blank"` and `rel="noopener noreferrer"` attributes for security and UX.
- [x] The styling blends seamlessly with the existing dark aesthetic, incorporating proper hover states.
- [x] The contact form remains fully functional and the layout remains clean and responsive.

## Blocked by

None - can start immediately
