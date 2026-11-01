# willianjusten.com.br

Personal site of Willian Justen: a single interactive page, in English and Portuguese, about who I am and what I do outside work.

It replaces the Portuguese frontend blog that lived here for about 10 years. Every old post URL redirects to the new page, and the old blog is preserved behind the `blog-final` git tag.

## What is on the page

- **Hero**: live São Paulo time, animated name and status tiles.
- **01 Places & photos**: a 3D dotted globe drawn on canvas, with a pin for every place I have photos from.
- **02 Games**: a 3D shelf of game cases with reactions, and a form where visitors recommend games (searched on IGDB).
- **03 NBA**: Courtside, the NBA app I built, and "Take a shot", a canvas basketball mini game with a shared all-visitors counter.
- **04 Music**: a record player that plays real 30-second previews of the song of the moment and past favorites.

## Stack

- Next.js 16 (App Router), React 19, TypeScript
- Tailwind CSS v4, with design tokens in `src/app/globals.css`
- next-intl: English at `/`, Portuguese at `/pt`
- Neon Postgres with Drizzle ORM, for shot stats, reactions, recommendations and rate limits
- zod for content schemas and request validation
- Vitest, oxlint and oxfmt
- Hosted on Vercel

No 3D library: the globe and the shot game are Canvas 2D, and the game cases and the record are CSS 3D transforms.

## Project layout

| Path              | What lives there                                                                                                  |
| ----------------- | ----------------------------------------------------------------------------------------------------------------- |
| `src/app/`        | Routes, API handlers, global styles, sitemap, robots and feed                                                     |
| `src/components/` | Page sections and their interactive pieces                                                                        |
| `src/content/`    | Typed content modules (places, games, music, profile), each validated by a zod schema registered in `registry.ts` |
| `src/lib/`        | Pure logic (globe math, shot physics, coverflow, redirects) and the database layer in `src/lib/db/`               |
| `messages/`       | UI copy, `en.json` and `pt.json` with identical keys                                                              |
| `drizzle/`        | Database migrations                                                                                               |
| `scripts/`        | Credentials wizard and the music previews script                                                                  |
| `data/legacy/`    | Data captured from the old blog (post slugs, song candidates)                                                     |

## Running locally

### Requirements

- Node 24 (see `.nvmrc`; `nvm use` picks it up)
- pnpm 10 (`corepack enable` installs the pinned version)

### Setup

```sh
pnpm install
```

The page renders without credentials, but the database and IGDB features need these variables in `.env.local`:

| Variable                                                               | Used for                                                                      |
| ---------------------------------------------------------------------- | ----------------------------------------------------------------------------- |
| `DATABASE_URL`                                                         | Neon connection string (use the `dev` branch locally)                         |
| `IP_HASH_SECRET`                                                       | Secret for hashing visitor IPs before rate limiting; raw IPs are never stored |
| `IGDB_CLIENT_ID`, `IGDB_CLIENT_SECRET`                                 | Twitch app credentials for the IGDB game search                               |
| `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET` | Photo albums (upcoming)                                                       |

The easiest way to get them is the credentials wizard. It walks through Neon, IGDB and Cloudinary, writes `.env.local` and sets the same variables on Vercel:

```sh
./scripts/setup-credentials.sh
```

Then apply the database migrations to the `dev` branch and start the dev server:

```sh
pnpm db:migrate
pnpm dev
```

Open http://localhost:3000 (English) or http://localhost:3000/pt (Portuguese).

### Commands

| Command                             | What it does                                                                   |
| ----------------------------------- | ------------------------------------------------------------------------------ |
| `pnpm dev`                          | Start the dev server                                                           |
| `pnpm build`                        | Production build (both locales render statically)                              |
| `pnpm start`                        | Serve the production build                                                     |
| `pnpm lint`                         | oxlint                                                                         |
| `pnpm format` / `pnpm format:check` | oxfmt (also sorts Tailwind classes)                                            |
| `pnpm typecheck`                    | `tsc --noEmit` (run `pnpm build` once first so Next generates its route types) |
| `pnpm test`                         | Vitest                                                                         |
| `pnpm db:generate`                  | Generate a migration after changing `src/lib/db/schema.ts`                     |
| `pnpm db:migrate`                   | Apply pending migrations to the database in `DATABASE_URL`                     |
| `pnpm music:previews`               | Fetch preview URLs and Apple Music links for the music content                 |
| `pnpm games:covers`                 | Fetch IGDB covers for the games content                                        |
| `pnpm icons`                        | Render the favicon and touch icon from the wj mark                             |

## Editing content

Content lives in `src/content/` and is checked against its schema by `pnpm test`, so a typo fails the build instead of the page.

- **Music**: add a track to `src/content/music.ts`, then run `pnpm music:previews`. It looks up each new track on iTunes (Deezer as fallback), writes `src/content/generated/music-previews.json` and skips tracks it already has (`--refresh` redoes them all).
- **Games**: edit `src/content/games.ts`, then run `pnpm games:covers`. It finds each new game on IGDB by exact title and writes its cover to `src/content/generated/game-covers.json` (`--refresh` redoes them all). When IGDB names a game differently (for example "Alan Wake II"), set `igdbId` on the game to pin it.
- **Places**: edit `src/content/places.ts`.
- **Copy**: edit `messages/en.json` and `messages/pt.json`, keeping the keys identical. No em dashes in either language.

### Moderating recommendations

New game recommendations go live for everyone right away. To take one down, open the `game_recommendations` table in the Neon console and set its `status` to `hidden`.

If recommendations turn abusive, switch `NEW_RECOMMENDATION_STATUS` in `src/lib/games/recommendation-stats.ts` to `"pending"`. New ones are then visible only to the visitor who sent them until you set `status` to `approved`.

## Deploying

The site deploys on Vercel (project `willianjusten-site`) through its Git integration:

- Every push to a branch, including `redesign`, gets a preview deployment that uses the Neon `dev` branch.
- Merging into `main` deploys production, which uses the Neon default (production) branch.

The environment variables listed above must exist on Vercel for both the Production and Preview environments. The credentials wizard sets them; otherwise add them in the Vercel dashboard or with `vercel env add`.

### Database migrations

Vercel does not run migrations. Before deploying a change that adds a migration, apply it to the target database:

```sh
# dev branch (reads DATABASE_URL from .env.local)
pnpm db:migrate

# production branch: a DATABASE_URL already set in the shell wins over .env.local
DATABASE_URL="<production connection string>" pnpm db:migrate
```

### CI

GitHub Actions runs lint, format check, type-check and tests on every pull request (`.github/workflows/ci.yml`).
