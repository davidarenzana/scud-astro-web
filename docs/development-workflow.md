# Development Workflow

Complete guide for contributing to scud-astro-web.

## Initial Setup

### Prerequisites

- **Node.js**: >=22.12.0 (check with `node --version`)
- **pnpm**: Latest version (install with `npm install -g pnpm`)
- **Git**: Latest version
- **VS Code**: Latest version with recommended extensions

### Setup Steps

```bash
git clone https://github.com/davidarenzana/scud-astro-web.git
cd scud-astro-web
pnpm install
pnpm build          # Verify build works
pnpm dev            # Start dev server → http://localhost:4321
```

When VS Code prompts "Workspace has recommended extensions", install them (Astro, Tailwind, Prettier, TypeScript).

---

## Git Workflow

### Branch Naming

- Features: `feature/page-name` or `feature/component-name`
- Fixes: `fix/issue-description`
- Chores: `chore/task-description`

### Workflow

```bash
git checkout main && git pull origin main
git checkout -b feature/my-feature

# Make changes → test → format
pnpm dev              # Test locally
pnpm run format       # Format code
pnpm astro check      # Check TypeScript
pnpm build            # Verify production build

git add .
git commit -m "feat(pages): add contact page"
git push origin feature/my-feature
# → Create PR on GitHub
```

### Commit Format

See [commit-messages.md](./commit-messages.md) for full spec.

```
<type>(<scope>): <description>    (max 50 chars, imperative mood)
```

**Types**: feat, fix, refactor, perf, docs, style, test, build, ci, chore, revert

---

## Before Submitting PR

- [ ] `pnpm build` succeeds
- [ ] `pnpm astro check` passes
- [ ] `pnpm run format` applied
- [ ] All 3 locales updated (if page/translation changes)
- [ ] Tested at: `localhost:4321/`, `/ca/`, `/en/`
- [ ] No console errors (F12 → Console)

### Production Build Test

```bash
pnpm build && pnpm preview
# Visit http://localhost:3000 — should match dev server
```

---

## Common Workflows

### Add a New Page

Use the `scud-astro-add-page` skill or see [i18n-patterns.instructions.md](./i18n-patterns.instructions.md) Pattern 3.

### Add a Component

See [i18n-patterns.instructions.md](./i18n-patterns.instructions.md) Pattern 4.

### Fix a Bug

1. Create branch: `git checkout -b fix/issue-name`
2. Fix + test: `pnpm dev`
3. Commit: `fix(component): resolve navigation highlighting`
4. Push + create PR

---

## Deployment

Merging to `main` triggers automatic deployment via CI/CD:

1. GitHub Actions runs `pnpm build`
2. Deploys to Netlify/Vercel
3. Version auto-bumped (see [release.md](./release.md))

---

## Further Reference

- **All commands**: [commands.md](./commands.md)
- **Troubleshooting**: [troubleshooting.md](./troubleshooting.md)
- **Code style**: [code-style.instructions.md](./code-style.instructions.md)
- **i18n patterns**: [i18n-patterns.instructions.md](./i18n-patterns.instructions.md)
