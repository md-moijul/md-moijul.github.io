Status: ready-for-human

## Parent
PRD-V1.md

## What to build
Integrate the EmailJS SDK into the `ContactSection`. Implement form validation and UI states for "Sending", "Success", and "Error". This enables professional communication without a custom backend.

## Acceptance criteria
- [ ] EmailJS SDK installed and initialized (with placeholder credentials).
- [ ] `ContactSection.vue` updated to include form validation (Email, Message required).
- [ ] Submission handler implemented with state management (idle, loading, success, error).
- [ ] User receives visual feedback upon successful submission or error.
- [ ] Automated confirmation email logic (if applicable via EmailJS template).

## Blocked by
- .scratch/v1/issues/01-routing-infrastructure.md
