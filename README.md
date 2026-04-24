# Scud Security Website

**Cybersecurity platform redesign** — Scud Sensor, Scud Smart Platform, Scud Monitor

- **Multi-language**: Spanish (default), Catalan, English
- **Stack**: Astro 6, Tailwind CSS, TypeScript
- **Responsive**: Mobile-first design
- **SEO-optimized**: hreflang, canonical, structured data

## Prerequisites

- **Node**: >=22.12.0
- **Package Manager**: pnpm
- **VS Code Extensions**: See `.vscode/extensions.json`

## Get Started

```bash
pnpm install          # Install dependencies
pnpm dev              # Start dev server → localhost:4321
pnpm build            # Build for production → dist/
pnpm preview          # Preview production build
```

## Project Structure

```
scud-astro-web/
├── astro.config.mjs          # Astro config (i18n, Tailwind, aliases)
├── tailwind.config.ts        # Tailwind configuration
├── tsconfig.json             # TypeScript config
├── src/
│   ├── pages/                # Routes (Astro native i18n)
│   │   ├── index.astro       # / (Spanish, default)
│   │   ├── ca/index.astro    # /ca/ (Catalan)
│   │   └── en/index.astro    # /en/ (English)
│   ├── layouts/
│   │   └── Layout.astro      # Root layout (lang, hreflang, canonical)
│   ├── components/
│   │   ├── sections/         # Page sections (Header, Footer)
│   │   ├── ui/               # Reusable UI (Navigation, ButtonGradient)
│   │   └── LanguageSwitcher.astro
│   ├── i18n/                 # Translations (es.json, ca.json, en.json)
│   ├── utils/
│   │   └── i18n.ts           # i18n helpers
│   ├── assets/               # Images, fonts
│   └── styles/
│       └── global.css        # Global Tailwind directives
├── public/                   # Static files (robots.txt, favicon)
└── dist/                     # Build output (generated)
```

## Commands

| Command            | Action                                           |
| :----------------- | :----------------------------------------------- |
| `pnpm install`     | Installs dependencies                            |
| `pnpm dev`         | Starts local dev server at `localhost:4321`      |
| `pnpm build`       | Build your production site to `./dist/`          |
| `pnpm preview`     | Preview your build locally, before deploying     |
| `pnpm run format`  | Format code with Prettier                        |
| `pnpm astro check` | Validate TypeScript                              |
| `pnpm astro ...`   | Run CLI commands like `astro add`, `astro check` |

## Development

- **Commits**: Follow Conventional Commits — see [docs/commit-messages.md](docs/commit-messages.md)
- **i18n**: Add strings to all 3 translation files (`src/i18n/{es,ca,en}.json`)
- **New pages**: Create in `pages/`, `pages/ca/`, `pages/en/`

## Documentation

| Topic                | File                                                                                                     |
| -------------------- | -------------------------------------------------------------------------------------------------------- |
| Code style & naming  | [.github/instructions/code-style.instructions.md](.github/instructions/code-style.instructions.md)       |
| i18n patterns        | [.github/instructions/i18n-patterns.instructions.md](.github/instructions/i18n-patterns.instructions.md) |
| All commands         | [docs/commands.md](docs/commands.md)                                                                     |
| Troubleshooting      | [docs/troubleshooting.md](docs/troubleshooting.md)                                                       |
| Git workflow         | [docs/development-workflow.md](docs/development-workflow.md)                                             |
| Commit messages      | [docs/commit-messages.md](docs/commit-messages.md)                                                       |
| Release & versioning | [docs/release.md](docs/release.md)                                                                       |
| AI agent context     | [AGENTS.md](AGENTS.md)                                                                                   |
| Skills               | [.agents/README.md](.agents/README.md)                                                                   |
