## Agent skills

### Issue tracker

Issues live in GitHub Issues for willianjusten/willianjusten.com.br, managed with the `gh` CLI. See `docs/agents/issue-tracker.md`.

### Triage labels

The five default labels: needs-triage, needs-info, ready-for-agent, ready-for-human, wontfix. See `docs/agents/triage-labels.md`.

### Domain docs

Single-context: `GLOSSARY.md` and `docs/adr/` at the repo root. See `docs/agents/domain.md`.

## Stack

Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS v4, next-intl, zod, Lucide, Vitest, oxlint and oxfmt. pnpm and Node 24 LTS (`.nvmrc`).

## Commands

- `pnpm dev`: start the dev server
- `pnpm build`: production build (both locales render statically)
- `pnpm lint`: oxlint
- `pnpm format` / `pnpm format:check`: oxfmt (pinned to an exact version, it sorts Tailwind classes)
- `pnpm typecheck`: `tsc --noEmit`
- `pnpm test`: Vitest

CI runs lint, format check, type-check and tests on every PR.

## Conventions

- No em dashes in any site copy, English or Portuguese. Rewrite with a comma, period or colon.
- Dark only (`color-scheme: dark`). Design tokens live in `src/app/globals.css` as CSS custom properties mapped into the Tailwind `@theme`; reuse them, never hard-code a colour, size or font.
- Locales: `en` unprefixed at `/`, `pt` at `/pt`. All copy goes in `messages/en.json` and `messages/pt.json`; keep the keys identical. Pages call `resolveLocale` (`src/i18n/resolve-locale.ts`) so they render statically.
- Typed content modules live in `src/content/`, each with a zod schema registered in `src/content/registry.ts`. The registry test parses every module.
- `data/legacy/` holds the captured old blog data and `scripts/setup-credentials.sh` the credential setup; leave both alone.
- Tests go through public seams (the proxy for locale routing, the registry for content), not internals.
