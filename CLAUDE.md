# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm run dev` — start the Vite dev server (local development)
- `npm run build` — production build into `dist/`
- `npm run preview` — serve the production build locally
- `npm run lint` — ESLint over `js,jsx` (`--max-warnings 0`). Note: no `.eslintrc` is committed, so this currently has no effect/config unless one is added.

There is no test suite.

## Architecture

This is a **single-page React + Vite portfolio site** (Jonathan Dorfman's personal portfolio), deployed to Netlify (`.netlify/` present). It is *not* a Next.js app despite `next` appearing in `package.json` dependencies — that dependency is unused; the app is bootstrapped entirely through `src/main.jsx` → `src/App.jsx`.

### Page composition
[src/App.jsx](src/App.jsx) renders every section in fixed order (`Navbar`, `Hero`, `About`, `FeaturedProject`, `Experience`, `Projects`, `Contact`, `ScrollNav`). There is no router — navigation is anchor-based (`href="#projects"` etc.) with `scroll-behavior: smooth`. App.jsx also sets up a single `IntersectionObserver` that adds an `is-visible` class to every `<section>` and `<footer>` on first scroll into view (one-time reveal animations); section components must render a `<section>` (with an `id` for anchor nav) for this to apply.

### Component convention
Each component lives in `src/components/<Name>/` as a paired `<Name>.jsx` + `<Name>.module.css`. Components are **named exports** (`export const Hero = ...`), not default exports. CSS Modules are configured with `localsConvention: "camelCase"` (see [vite.config.js](vite.config.js)), so import as `styles` and reference `styles.someClass`.

### Content is data-driven
Section content comes from JSON in [src/data/](src/data/):
- `projects.json` — project cards (each has a numeric `id` used for special-casing, see gotcha below)
- `history.json` — work experience timeline
- `certifications.json` — certifications

To change copy/projects/experience, edit these JSON files rather than the JSX.

### Images and static assets
Image assets live in `/assets/` at the **repo root** (not `src/` or `public/`). Reference them through [src/utils.js](src/utils.js)'s `getImageUrl(path)` helper, which resolves `/assets/${path}` (e.g. `getImageUrl("hero/heroImage.png")`). Downloadable files (resume PDF, etc.) live in `public/` and are referenced by absolute path (e.g. `href="/JonathanDorfman_Resume.pdf"`).

### Styling system
Global CSS lives in [src/index.css](src/index.css) and design tokens in [src/vars.css](src/vars.css) (CSS custom properties: dark-blue/silver palette, spacing scale, transitions, fonts). Use the `--color-*`, `--spacing-*`, `--transition-*` variables in component CSS rather than hardcoding values. Note: `html { zoom: 0.8 }` in index.css scales the entire site to 80% — keep this in mind when reasoning about sizing.

## Gotchas

- **ProjectCard id-based special-casing**: [src/components/Projects/ProjectCard.jsx](src/components/Projects/ProjectCard.jsx) hardcodes behavior by project `id` — e.g. demo/source links are disabled for specific ids (`isDemoDisabled = id === 1`, `isSourceDisabled = [1,3,4,7]`), id `3` rewrites its demo to `/splunkPractice.pdf`, and id `8` (ProductShotAI) gets a distinct three-button layout. When adding or renumbering projects in `projects.json`, update these id checks accordingly.
- The `next` dependency is dead weight; do not assume Next.js features (routing, SSR, `app/` dir) are available.
