# Personal Portfolio

A sleek, responsive, and highly interactive personal portfolio website designed with a focus on modern aesthetics, smooth scrolling, and maintainability.

## 🚀 Tech Stack

- **Framework:** [Vue 3](https://vuejs.org/) (Composition API / `<script setup>`)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
- **Smooth Scrolling:** [Lenis](https://lenis.studiofreight.com/)
- **Build Tool:** [Vite](https://vitejs.dev/)
- **Icons:** [Lucide Vue Next](https://lucide.dev/)

## 🛠️ Getting Started

### Prerequisites

Ensure you have Node.js installed (v18+ recommended).

### Installation

1. Clone the repository:
   ```bash
   git clone <your-repo-url>
   cd personal-portfolio
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

### Development

Start the local Vite development server:
```bash
npm run dev
```

### Production Build

Create a production-ready build:
```bash
npm run build
```

Preview the production build locally:
```bash
npm run preview
```

## 📚 Documentation & Architecture

This project is meticulously documented for both human contributors and AI agents. If you are exploring the codebase or planning to make changes, please refer to the following:

- **[CONTEXT.md](./CONTEXT.md)**: The ubiquitous language and domain glossary. Start here to understand what we mean by "Project", "Experience", and "Feature Component".
- **[GEMINI.md](./GEMINI.md)**: The AI and Developer guidelines. Contains rules on component patterns, state management, and file structure conventions.
- **[docs/adr/](./docs/adr/)**: Architectural Decision Records. Read these to understand *why* certain technical choices were made (e.g., our hybrid routing architecture with Lenis).

## 🗂️ Data Management

All structural content (Projects, Experiences, Contact info) is completely decoupled from the UI and managed centrally in `src/assets/data.ts`. To update your portfolio's content, simply modify this file—the UI will automatically reflect the changes.
