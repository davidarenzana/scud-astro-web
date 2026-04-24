# Scud Security Website

**Cybersecurity platform redesign** — Scud Sensor, Scud Smart Platform, Scud Monitor

- 🌐 **Multi-language**: Spanish (default), Catalan, English
- 🎨 **Stack**: Astro 6, Tailwind CSS, TypeScript
- 📱 **Responsive**: Mobile-first design
- ⚡ **SEO-optimized**: hreflang, canonical, structured data

## Get Started

```bash
# Install dependencies
pnpm install

# Start dev server (localhost:4321)
pnpm dev

# Build for production
pnpm build

# Preview build
pnpm preview
```

```text
/
├── public/
│   └── favicon.svg
├── src
│   ├── assets
│   │   └── astro.svg
│   ├── components
│   │   └── Welcome.astro
│   ├── layouts
│   │   └── Layout.astro
│   └── pages
│       └── index.astro
└── package.json
```

To learn more about the folder structure of an Astro project, refer to [our guide on project structure](https://docs.astro.build/en/basics/project-structure/).

## 📚 Documentation

- **[AGENTS.md](./AGENTS.md)** — Quick reference for AI agents
- **[ARCHITECTURE.md](./ARCHITECTURE.md)** — Technical architecture & design decisions
- **[DEVELOPMENT.md](./DEVELOPMENT.md)** — Setup, workflows, and troubleshooting guide
- **[NAMING_CONVENTIONS.md](./NAMING_CONVENTIONS.md)** — Code standards & conventions
- **[.copilot-context/](./.copilot-context/)** — Specialized context for Copilot (architecture, code-style, i18n patterns, commands, troubleshooting)
- **[.agents/](./.agents/)** — Automation skills & workflows
- **[.github/instructions/](./.github/instructions/)** — Contribution guidelines & commit rules

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                | Action                                           |
| :--------------------- | :----------------------------------------------- |
| `pnpm install`         | Installs dependencies                            |
| `pnpm dev`             | Starts local dev server at `localhost:4321`      |
| `pnpm build`           | Build your production site to `./dist/`          |
| `pnpm preview`         | Preview your build locally, before deploying     |
| `pnpm astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `pnpm astro -- --help` | Get help using the Astro CLI                     |

## Development

- **Commits**: Follow Conventional Commits — see `.copilot-instructions`
- **i18n**: Add strings to all 3 translation files
- **New pages**: Create in pages/, pages/ca/, pages/en/

## References

- **Full context**: `.agent.md`
- **Architecture**: `ARCHITECTURE.md`
- **Commit rules**: `.github/instructions/copilot-commit-message.md`

---

**Company**: Scud Security  
**Website**: https://scudsecurity.com  
**Location**: Barcelona, Spain
