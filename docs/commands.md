# Development Commands

Quick reference for common pnpm scripts and terminal commands.

## 🚀 Essential Commands

### Start Development Server

```bash
pnpm dev
# Output: Local: http://localhost:4321
#         Ready in 1234ms
```

Open http://localhost:4321 in browser. Auto-reloads on file changes.

### Build for Production

```bash
pnpm build
# Output: Generating optimized bundle...
#         Build complete in 5s
#         Output: dist/
```

Generates static files in `dist/` folder. Ready to deploy.

### Preview Production Build Locally

```bash
pnpm preview
# Output: Preview server running at http://localhost:3000
```

Serves the `dist/` folder locally before deploying.

### Check TypeScript

```bash
pnpm astro check
# Validates all TypeScript files
# Shows errors (if any) and warnings
```

---

## 🚀 Release & Versioning

### Automatic Release (Recommended)

**Merge PR to main → Automatic version bump + changelog generation**

How it works:

1. Merge a PR to `main` branch
2. GitHub Actions (`bump-version` workflow) triggers automatically
3. Version incremented in `package.json` (0.0.1 → 0.0.2)
4. `CHANGELOG.md` updated with release entry + commits
5. Changes auto-committed and pushed to main

**No action needed** — fully automatic! ✨

### Manual Release (Fallback)

If you need to bump version manually on any branch:

```bash
pnpm bump-version
```

Does the same as automatic workflow (local only, doesn't push).

### View Release History

```bash
cat CHANGELOG.md           # View changelog
git log --oneline         # View commit history
git tag -l                # View all version tags
```

---

## 🧹 Code Quality

### Format Code (Prettier)

```bash
pnpm run format
# or
npx prettier --write .
```

Auto-formats all files (`.astro`, `.ts`, `.json`, `.md`).

**Note**: Prettier runs automatically on save in VSCode if `.vscode/settings.json` is configured.

---

## 🔍 Debugging Commands

### Check File Structure

```bash
# List pages (routes)
ls -la src/pages/
ls -la src/pages/ca/
ls -la src/pages/en/

# Check translations
cat src/i18n/es.json
cat src/i18n/ca.json
cat src/i18n/en.json
```

### View Build Output

```bash
# Before deploying
ls -la dist/

# Check generated HTML
cat dist/index.html

# Check CSS bundled
ls -la dist/_astro/
```

### TypeScript Type Check

```bash
# Full project check
pnpm astro check

# VS Code: Cmd+Shift+P → "TypeScript: Restart TS Server"
```

### Clean Build Cache

```bash
# Remove Astro cache
rm -rf .astro/

# Full clean rebuild
rm -rf node_modules .astro dist/
pnpm install
pnpm build
```

---

## 🌍 Testing i18n

### Test All Locales Locally

Open in browser:

```
http://localhost:4321/              (Spanish)
http://localhost:4321/ca/           (Catalan)
http://localhost:4321/en/           (English)

http://localhost:4321/about/        (Spanish about)
http://localhost:4321/ca/about/     (Catalan about)
http://localhost:4321/en/about/     (English about)
```

### Check Language Switcher

1. Open http://localhost:4321
2. Click language switcher (bottom right, usually)
3. Verify links navigate to correct locale URL

### Validate hreflang Tags

1. Open DevTools (F12)
2. Go to `<head>` section
3. Check `<link rel="alternate" hreflang="">` tags
4. Should have entries for es, ca, en

```html
<!-- Expected in <head> -->
<link rel="canonical" href="https://example.com/en/about/" />
<link rel="alternate" hreflang="es" href="https://example.com/about/" />
<link rel="alternate" hreflang="ca" href="https://example.com/ca/about/" />
<link rel="alternate" hreflang="en" href="https://example.com/en/about/" />
```

---

## 🔧 Astro CLI Commands

### Add Integrations

```bash
# Add new Astro integration (interactive)
pnpm astro add
# Then follow prompts
```

### Generate Type Definitions

```bash
# Update TypeScript types for components
pnpm astro sync
```

### Astro Help

```bash
# List all available commands
pnpm astro --help

# Help for specific command
pnpm astro dev --help
```

---

## 📦 Package Management

### Add Dependency

```bash
# Add to dependencies
pnpm add package-name

# Add to devDependencies
pnpm add --save-dev package-name
```

### Update Dependencies

```bash
# Check outdated packages
pnpm outdated

# Update everything
pnpm update

# Update specific package
pnpm update package-name
```

### Lock File

```bash
# If you modify pnpm-lock.yaml manually:
pnpm install
# Updates lockfile
```

---

## 🔗 Git Workflow

### Before Committing

```bash
# Check project is building correctly
pnpm build

# Verify dev server works
pnpm dev
# (Ctrl+C to stop)

# Format code
pnpm run format

# Check TypeScript
pnpm astro check
```

### Commit

```bash
# Create commit following conventions
git commit -m "feat(pages): add contact page"
# (See docs/commit-messages.md)
```

### Push to Remote

```bash
git push origin branch-name
```

---

## 🐛 Troubleshooting Commands

### Port Already in Use

```bash
# If localhost:4321 is in use, kill the process
# On macOS/Linux:
lsof -i :4321
kill -9 <PID>

# Try dev server again
pnpm dev
```

### Clear Node Cache

```bash
# Delete pnpm cache
pnpm store prune

# Delete node_modules
rm -rf node_modules

# Reinstall
pnpm install
```

### Reset to Clean State

```bash
# Full clean + rebuild
rm -rf node_modules dist .astro pnpm-lock.yaml
pnpm install
pnpm build
```

### View Server Logs

```bash
# Dev server logs
pnpm dev
# (logs appear in terminal, Ctrl+C to stop)

# Production build logs
pnpm build
# (shows build progress and any errors)
```

---

## 📊 Performance Checks

### Build Size Analysis

```bash
# After building
du -sh dist/

# See what's taking space
du -sh dist/*
du -sh dist/_astro/*
```

### Check Unused CSS

```bash
# Tailwind purges unused classes automatically
# But you can verify build output:
wc -c dist/_astro/*.css
# (Check CSS file sizes)
```

---

## 🚀 Deployment Commands

### Netlify/Vercel

```bash
# Build locally to verify
pnpm build

# Output is ready to deploy
# Both platforms: Deploy `dist/` folder
```

### Deploy from GitHub

```bash
# Platforms auto-deploy on push to main
git push origin main
# → Netlify/Vercel CI/CD triggers automatically
```

---

## 📚 Full Reference

- **pnpm docs**: https://pnpm.io/
- **Astro CLI**: https://docs.astro.build/en/cli/
- **TypeScript check**: https://docs.astro.build/en/guides/typescript/

---

## ✅ Quick Command Checklist

Before each development session:

```bash
pnpm install        # Ensure dependencies installed
pnpm dev           # Start dev server
# (in another terminal)
pnpm astro check   # Validate TypeScript
```

Before committing:

```bash
pnpm build         # Verify production build
pnpm run format    # Format code
```

Before deploying:

```bash
pnpm build         # Final production build
# Deploy dist/ folder
```
