Status: completed

## Parent
PRD-V1.md

## What to build
Integrate the EmailJS SDK into the `ContactSection` with a simplified, single-step submission process. Update the layout to a grid-based structure where the email input, name input, and send button are on the same line (desktop), followed by the message textarea.

## Acceptance criteria
- [x] **Security:** `.env` added to `.gitignore`, unstaged, and populated with placeholders.
- [x] **Initialization:** EmailJS initialized once in `main.ts` using `emailjs.init()`.
- [x] **Standards:** All imports use `@/` alias; UI strings moved to `src/assets/data.ts`.
- [x] **Simplified UX:** 
    - [x] Remove the two-step "consenting" flow.
    - [x] New layout: [Email] [Name] [Send] in a grid row, [Message] below.
    - [x] Form is hidden entirely upon `success`, showing only the success message.
    - [x] Form remains available/re-editable on `error`.
- [x] **Testing:** Unit tests updated to cover the single-step flow and new layout.

## Status
Completed

## Blocked by
- .scratch/v1/issues/01-routing-infrastructure.md
