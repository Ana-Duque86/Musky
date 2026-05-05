# Musky Design System Agent Guide

## Project Root

All work happens in `/Users/anaduque/Documents/Personal/Repos/Musky`.

## Agent Workflow

Follow the BrandStructure flow before creating or changing UI:

1. **Orient:** read this file and the component metadata.
2. **Explore:** read `.ai/index.toon` and `.ai/relationships/component-usage.toon` when they exist.
3. **Study:** read the target component `*.metadata.json`.
4. **Gather:** verify tokens and data requirements.
5. **Write:** implement in Figma and code.
6. **Verify:** screenshot Figma, run typecheck/docs build when available.

## Design System Rules

- Reuse existing components and tokens before introducing new ones.
- Do not invent component data fields locally. Add shared fields to `data/ui-fields.json` and reference them from metadata.
- Figma visual source: `Musky — UI Tokens` in the Figma file. Naming and bindings: `docs/foundations/figma-musky-contract.md`.
- Code behavior source: `packages/ui`.
- Usage source: `apps/docs`.

## Figma To Code Positioning

Do not translate Figma `x`/`y` directly for absolutely positioned elements. Interpret constraints:

- `MIN` maps to `start` / `top`.
- `MAX` maps to `end` / `bottom`.
- `STRETCH` maps to both edges and no fixed width/height.
- `CENTER` maps to a center offset.
- `SCALE` maps to percentages.

Metadata must explicitly record when an internal element uses absolute positioning, especially badges and overlays.

## Git y Storybook en Vercel

- **Qué va en Git:** código fuente, `package-lock.json`, Storybook en `apps/docs/.storybook`, `vercel.json`, `.vercel/project.json` (enlace al proyecto), workflow en `.github/workflows/`. **No** subir `apps/docs/storybook-static/` (se genera con `npm run build:docs`).
- **CI:** el workflow `Deploy Storybook` necesita en GitHub **Secrets** `VERCEL_TOKEN` y `VERCEL_ORG_ID` (`team_…` desde Team Settings). Opción alternativa: en [Vercel](https://vercel.com) → proyecto **musky_storybook** → **Connect Git** y dejar que Vercel construya con los mismos comandos que `vercel.json`. **No actives los dos a la vez** (evitas dos despliegues por push): o solo Actions, o solo Connect Git (y entonces desactiva o borra el workflow).
- **Manual:** `npm run deploy:storybook` (requiere `vercel login`).
- **Primer push a GitHub:** instala [GitHub CLI](https://cli.github.com/) (`brew install gh`), luego en la raíz del repo ejecuta `npm run repo:github` (crea el repo privado `musky-design-system`, enlaza `origin` y hace `push` de `main`).

## Skills

Packaged skills live in `Skills/*.skill`. They are zip archives with `SKILL.md`, scripts, and references.

Recommended usage:

- `codebase-index.skill`: generate `.ai` maps.
- `ai-component-metadata.skill`: author component metadata.
- `ai-ds-composer.skill`: compose UI from existing components.
- `figma-variables-generator.skill`: only for bulk token JSON/export work.
- `figma-component-generator.skill`: optional; requires `figma-cli`.
- `spec-ideation.skill`: use during broad planning, not every component.
