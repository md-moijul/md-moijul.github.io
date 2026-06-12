## What to build

Add the Umami Cloud tracking script to the project's `index.html`. This enables basic page view tracking and provides the infrastructure for event tracking.

The script to be added:
```html
<script defer src="https://cloud.umami.is/script.js" data-website-id="34126708-11ab-4a4f-9433-d305a68d141a"></script>
```

## Acceptance criteria

- [x] Umami script is present in the `<head>` or at the end of `<body>` in `index.html`.
- [x] The `data-website-id` matches `34126708-11ab-4a4f-9433-d305a68d141a`.
- [x] The script is loaded with the `defer` attribute to prevent blocking page render.

## Blocked by

None - can start immediately
