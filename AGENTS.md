# Project: Sebastian Arroyo Portfolio

## Stack
- **Framework:** Next.js 16 (App Router, output: export)
- **Styling:** Tailwind CSS v4 + custom CSS in `globals.css`
- **Language:** TypeScript
- **Deployment:** GitHub Pages via `.github/workflows/deploy.yml`

## Key commands
- `npm run dev` — local dev server
- `npm run build` — static export to `out/`
- `npm run lint` — ESLint

## Structure
- `src/app/page.tsx` — main page (client component with all sections)
- `src/app/layout.tsx` — root layout (Inter font, metadata)
- `src/app/globals.css` — Tailwind + custom CSS (variables, animations, responsive)
- `src/components/` — React components (Navbar, ShaderBg, sections, footer)
- `src/hooks/` — custom hooks (useShaderBg, useScrollReveal, useScrollSpy)
- `public/cv.pdf` — downloadable CV
