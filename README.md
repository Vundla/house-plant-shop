# Verdant Vibes — Houseplant Boutique

Modern, production-ready single-page ecommerce experience for a boutique houseplant brand. Built with Vite, React, TypeScript, Redux Toolkit, and React Router. Includes a fully wired cart flow, responsive design, automated tests, linting, and deployment playbooks.

## Features
- **Landing page** with hero background, brand story, and "Get Started" CTA linking to the catalog.
- **Product listing page** showcasing six curated plants grouped into three lifestyle categories. Each card has imagery, price, description, and guarded Add to Cart interactions.
- **Persistent header** with polished navigation and live cart badge available on catalog and cart routes.
- **Redux-powered cart** that backs item counts, button disabling, totals, increment/decrement, delete, and checkout stubs.
- **Local cart persistence** so selections survive refreshes via browser storage.
- **Shopping cart page** summarizing line items, totals, and allowing quantity management with accessible controls.
- **Testing and linting** via Vitest, Testing Library, ESLint, and Prettier for confident iteration.

## Getting Started

```bash
npm install
npm run dev
```

Vite opens `http://localhost:5173` automatically. Use `npm run preview` to serve the production build locally after running `npm run build`.

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start Vite development server with fast refresh |
| `npm run build` | Type-check and build optimized production bundle |
| `npm run preview` | Serve the generated build locally |
| `npm run lint` | Run ESLint with the provided configuration |
| `npm run test` | Run Vitest unit and component tests once |
| `npm run test:watch` | Run Vitest in watch mode |

## Project Structure

```
src/
  app/           Redux store + typed hooks
  components/    Reusable UI (header, cards, cart rows)
  data/          Static product catalog + currency formatter
  features/      Redux slice for cart with selectors and tests
  pages/         Route-level views (Landing, Products, Cart)
  styles/        Global styling and theme tokens
  test-utils.tsx Testing helpers (Provider + Router wrappers)
```

## Testing & Quality Gates

```bash
npm run lint        # optional: configure eslint -- we provide an .eslintrc
npm run test        # vitest with Testing Library + jest-dom matchers
npm run build       # ensures type-check passes before bundling
```

Vitest is configured with jsdom, React Testing Library, and jest-dom matchers via `vitest.setup.ts`.

## Deployment

### 1. Deploy with Vercel (recommended)
1. Create a GitHub repository and push this project.
2. In Vercel, "Import Project" → select the repo.
3. Use build command `npm run build` and output directory `dist`.
4. Vercel detects Vite automatically and provisions a CDN-backed deployment with previews per pull request.

### 2. Deploy to GitHub Pages
1. Install GitHub Pages plugin: `npm install --save-dev gh-pages` (optional helper).
2. Update `package.json` with `"homepage": "https://<username>.github.io/<repo-name>/"` and add scripts:
   - `"predeploy": "npm run build"`
   - `"deploy": "gh-pages -d dist"`
3. Set `base: '/<repo-name>/'` in `vite.config.ts` for GitHub Pages routing.
4. Run `npm run deploy` to publish to the `gh-pages` branch.

Alternatively, configure the `static` GitHub Pages workflow (`Settings → Pages → Build and deployment → GitHub Actions`) using the official Vite template.

## Production Notes
- Assets load from responsive remote Unsplash URLs and lazy-load for performance.
- Redux Toolkit memoized selectors back high-confidence derived data.
- Buttons and links include accessible labels, disabled states, and focus styles through default browser outlines.
- CSS delivers responsive layouts down to small screens using fluid spacing tokens.

## Next Steps
- Wire a real backend (Django REST, FastAPI, or Node/Express) for persistent inventory.
- Add authentication and profile management for saved carts or wishlists.
- Integrate payment providers (Stripe Checkout) once backend exists.
- Expand test coverage with integration tests for cart flow and routing.

---
Crafted with care by Verdant Vibes.
