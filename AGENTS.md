# Scud Security Website — Agent Instructions

**Project**: Redesigning scudsecurity.com (cybersecurity platform)
**Stack**: Astro 6 · Tailwind CSS v4 · TypeScript · pnpm
**Node**: >=22.12.0

## Tech Stack

| Tool         | Purpose         | Version |
| ------------ | --------------- | ------- |
| Astro        | Framework       | 6.x     |
| Tailwind CSS | Styling         | 4.x     |
| TypeScript   | Type safety     | Latest  |
| pnpm         | Package manager | Latest  |
| Prettier     | Code formatting | 3.x     |

## Quick Context

- **Default locale**: es (Spanish) — no URL prefix
- **Other locales**: ca, en — URL prefixed (`/ca/`, `/en/`)
- **Tech decision**: Astro native i18n (no external libraries)
- **SEO**: Automatic hreflang + canonical tags in Layout

## Essentials

| What            | Where             | Command                        |
| --------------- | ----------------- | ------------------------------ |
| Dev server      | localhost:4321    | `pnpm dev`                     |
| Build           | dist/             | `pnpm build`                   |
| Translations    | src/i18n/\*.json  | 3 JSON files (es, ca, en)      |
| i18n logic      | src/utils/i18n.ts | getI18n(), getLocaleFromPath() |
| Release history | CHANGELOG.md      | Auto-updated with each version |
| Auto-versioning | GitHub Actions    | Merge PR → version bumps       |

## Architecture Decisions

### i18n: Astro Native (not i18next)

- **Zero bundle overhead** — built-in `astro:i18n` module
- File-based routing integrates perfectly with Astro
- Future-proof: maintained by Astro core team

### URL Structure: Default Locale Without Prefix

```
Spanish (default):  /           (no /es/ prefix)
Catalan:            /ca/*       (prefixed)
English:            /en/*       (prefixed)
```

- Cleaner URLs for primary market (Spanish)
- SEO advantage: default locale at root has higher authority
- Pattern recommended by Astro docs

### File Structure: Tripled Pages

```
src/pages/
  index.astro         → / (es)
  ca/index.astro      → /ca/ (ca)
  en/index.astro      → /en/ (en)
```

Astro limitation: file-based routing requires physical files per locale.
Mitigated by `scud-astro-add-page` skill (5 min → 30 sec).

### Styling: Tailwind CSS v4

- `@tailwindcss/vite` plugin integration
- Tree-shakeable: only used styles in production
- Zero JavaScript by default (all components are stateless, server-rendered)

### SEO: Automatic hreflang + Canonical

Layout.astro automatically sets `<html lang="">`, `<link rel="canonical">`, and `<link rel="alternate" hreflang="">` for all locales.

### Deployment: Static Site

No server needed. Astro generates static files → CDN (Netlify/Vercel).

### JSON Translations (not CMS)

Translations live in `src/i18n/{es,ca,en}.json`. Simple, versioned, zero runtime overhead.
Migrate to CMS when: >500 keys, non-dev editors, or A/B testing needed.

## i18n Implementation

### Translation Files

```
src/i18n/
  es.json  # Spanish strings + routes
  ca.json  # Catalan strings + routes
  en.json  # English strings + routes
```

### Utilities (`src/utils/i18n.ts`)

| Function                      | Input         | Output               | Use                     |
| ----------------------------- | ------------- | -------------------- | ----------------------- |
| `getLocaleFromPath(pathname)` | "/ca/about"   | "ca"                 | Extract locale from URL |
| `getCurrentLocale(astro)`     | Astro context | "es" \| "ca" \| "en" | Get page's locale       |
| `getI18n(locale)`             | "es"          | Translation object   | Access strings          |

### Configuration (`astro.config.mjs`)

```js
i18n: {
  locales: ["es", "ca", "en"],
  defaultLocale: "es",
  routing: { prefixDefaultLocale: false, redirectToDefaultLocale: false }
}
```

## Component Hierarchy

```
Layout.astro
├── Header.astro
│   ├── Navigation.astro
│   └── LanguageSwitcher.astro
└── <page-content>
```

All components are stateless, server-rendered Astro components. No client-side framework (React/Vue/Svelte).

## Add New Page

1. Create: `src/pages/route.astro` (es)
2. Create: `src/pages/ca/route.astro` (ca)
3. Create: `src/pages/en/route.astro` (en)
4. Import Layout + Header components
5. Update translations in 3 JSON files

## Commits

**Format**: `<type(scope)>: description` (max 50 chars, imperative mood)
**Types**: feat, fix, refactor, perf, docs, style, test, build, ci, chore, revert
**Example**: `feat(pages): add about us page`
See [docs/commit-messages.md](./docs/commit-messages.md) for full spec.

## i18n Rules

- Always update all 3 files: `src/i18n/{es,ca,en}.json`
- Use `getCurrentLocale(Astro)` in top-level components
- Use `getI18n(locale)` to access translation strings
- Translation keys: `section.key` format (lowercase, dot-notation)

## Essential Commands

| Command            | Purpose                           |
| ------------------ | --------------------------------- |
| `pnpm dev`         | Start dev server (localhost:4321) |
| `pnpm build`       | Build for production (dist/)      |
| `pnpm preview`     | Preview production build          |
| `pnpm run format`  | Format code with Prettier         |
| `pnpm astro check` | Validate TypeScript               |
| `pnpm bump-version`| Manual version bump (fallback)    |

## Adding Features

- **New Page**: Use `scud-astro-add-page` skill or create 3 files manually + translations
- **New Component**: Use `getCurrentLocale(Astro)` + `getI18n(locale)` pattern
- **New Translation**: Add key to all 3 JSON files simultaneously

## Documentation

| Topic | File |
| ----- | ---- |
| Code style & naming | [.github/instructions/code-style.instructions.md](./.github/instructions/code-style.instructions.md) |
| i18n patterns | [.github/instructions/i18n-patterns.instructions.md](./.github/instructions/i18n-patterns.instructions.md) |
| All commands | [docs/commands.md](./docs/commands.md) |
| Troubleshooting | [docs/troubleshooting.md](./docs/troubleshooting.md) |
| Release & versioning | [docs/release.md](./docs/release.md) |
| Commit messages | [docs/commit-messages.md](./docs/commit-messages.md) |
| Git workflow | [docs/development-workflow.md](./docs/development-workflow.md) |
| Skills | [.agents/README.md](./.agents/README.md) |

## References

- **Development Guide**: [README.md](./README.md)
- **Skills**: [.agents/README.md](./.agents/README.md)
