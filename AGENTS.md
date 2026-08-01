# AGENTS.md

## Quick Commands

```bash
bun dev          # Start Vite dev server (port 5173)
bun run build    # Build production output to dist/
bun run lint     # Run oxlint (not ESLint)
```

## Architecture

- **React 19 SPA** — single-page app, no router library, views managed by `activeView` state in `src/App.jsx`
- **No backend** — all data persists in `localStorage` under key `finanzas-app-data-v2`
- **JSX files** — components use `.jsx` extension, not `.tsx`
- **Package manager**: Bun (`bun.lock` present)
- **Tanstack Framework**: All tanstack suite applications
- 

## Data Model

- `src/data/defaultData.js` defines `defaultData` (initial state shape) and `sampleData`
- Categories are hardcoded arrays: `INCOME_CATEGORIES`, `FIXED_CATEGORIES`, `EXPENSE_CATEGORIES`
- Custom hook `src/hooks/useLocalStorage.js` wraps `useState` + localStorage sync

## Key Conventions

- Linter is **oxlint**, not ESLint — no `.eslintrc`, no `eslint.config.js`
- No test framework configured — no test commands to run
- Spanish UI labels; English code and variable names
- Currency symbol defaults to `€`
- Month names in Spanish (enero–diciembre) from `defaultData.js`

## Gotchas

- `tsconfig.json` exists but project uses JSX files — TypeScript strict mode is set but no `.ts`/`.tsx` files exist
- `vite.config.js` is plain JS, not TS
- No CI workflows — no `.github/workflows/`
- `RENDER_DEPLOYMENT.md` documents Render static site deploy (build command: `npm run build`, publish dir: `dist`) @RENDER_DEPLOYMENT.md


