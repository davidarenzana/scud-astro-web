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
| Dev server     | localhost:4321    | `pnpm dev`                     |
| Build          | dist/             | `pnpm build`                   |
| Translations   | src/i18n/\*.json  | 3 JSON files (es, ca, en)      |
| i18n logic     | src/utils/i18n.ts | getI18n(), getLocaleFromPath() |
| Release history | CHANGELOG.md      | Auto-updated with each version |
| Auto-versioning | GitHub Actions   | Merge PR → version bumps       |

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

## 📚 Documentation Structure

For detailed context, see specialized files in `.copilot-context/`:

- **[.copilot-context/architecture.md](./.copilot-context/architecture.md)** — Why decisions were made
- **[.copilot-context/code-style.md](./.copilot-context/code-style.md)** — Naming & formatting rules
- **[.copilot-context/i18n-patterns.md](./.copilot-context/i18n-patterns.md)** — i18n workflows
- **[.copilot-context/commands.md](./.copilot-context/commands.md)** — All pnpm commands
- **[.copilot-context/release.md](./.copilot-context/release.md)** — Versioning & changelog
- **[.copilot-context/troubleshooting.md](./.copilot-context/troubleshooting.md)** — Common issues & fixes

## References

- **Full Architecture**: [ARCHITECTURE.md](./ARCHITECTURE.md)
- **Development Guide**: [DEVELOPMENT.md](./DEVELOPMENT.md)
- **Code Standards**: [NAMING_CONVENTIONS.md](./NAMING_CONVENTIONS.md)
- **Copilot Rules**: [.copilot-instructions](./.copilot-instructions)
- **Commit Spec**: [.github/instructions/copilot-commit-message.md](./.github/instructions/copilot-commit-message.md)
- **Dev Workflow**: [.github/instructions/development-workflow.md](./.github/instructions/development-workflow.md)
- **Skills**: [.agents/README.md](./.agents/README.md)
