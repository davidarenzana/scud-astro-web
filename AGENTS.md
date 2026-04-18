# Scud Security Website — Agent Instructions

**Project**: Redesigning scudsecurity.com (cybersecurity platform)  
**Stack**: Astro 6 · Tailwind CSS · TypeScript · pnpm  
**Node**: >=22.12.0

## Quick Context

- **Default locale**: es (Spanish) — no URL prefix
- **Other locales**: ca, en — URL prefixed (`/ca/`, `/en/`)
- **Tech decision**: Astro native i18n (no external libraries)
- **SEO**: Automatic hreflang + canonical tags in Layout

## Essentials

| What         | Where             | Command                        |
| ------------ | ----------------- | ------------------------------ |
| Dev server   | localhost:4321    | `pnpm dev`                     |
| Build        | dist/             | `pnpm build`                   |
| Translations | src/i18n/\*.json  | 3 JSON files (es, ca, en)      |
| i18n logic   | src/utils/i18n.ts | getI18n(), getLocaleFromPath() |

## Add New Page

1. Create: `src/pages/route.astro` (es)
2. Create: `src/pages/ca/route.astro` (ca)
3. Create: `src/pages/en/route.astro` (en)
4. Import Layout + Header components
5. Update translations in 3 JSON files

## Commits

**Format**: `<type(scope)>: description` (max 50 chars)  
**Example**: `feat(pages): add about us page`  
See `.github/instructions/copilot-commit-message.md` for full spec

## References

- Architecture: `ARCHITECTURE.md`
- Guidelines: `.copilot-instructions`
- Commit spec: `.github/instructions/copilot-commit-message.md`
