# Development Workflow

Complete guide for setting up your development environment and contributing to scud-astro-web.

## 🏗️ Initial Setup

### Prerequisites

- **Node.js**: >=22.12.0 (check with `node --version`)
- **pnpm**: Latest version (install with `npm install -g pnpm`)
- **Git**: Latest version
- **VS Code**: Latest version with recommended extensions

### Step 1: Clone Repository

```bash
git clone https://github.com/davidarenzana/scud-astro-web.git
cd scud-astro-web
```

### Step 2: Install Dependencies

```bash
pnpm install
# Wait for installation to complete (~2 minutes)
```

### Step 3: Verify Setup

```bash
# Check Node version
node --version      # Should be >=22.12.0

# Check pnpm version
pnpm --version

# Check project builds
pnpm build
# Should complete successfully with "Build complete" message
```

### Step 4: Start Development Server

```bash
pnpm dev
# Output: Local: http://localhost:4321
```

Open http://localhost:4321 in browser. You should see the homepage.

### Step 5: Install Recommended Extensions (VS Code)

When you open the project in VS Code, you'll see a notification:
"Workspace has recommended extensions"

Click "Show Recommended" and install:
- **Astro** (`astro-build.astro-vscode`)
- **Tailwind CSS** (`bradlc.vscode-tailwindcss`)
- **TypeScript** (`ms-vscode.vscode-typescript-next`)
- **Prettier** (`esbenp.prettier-vscode`)
- **GitHub Copilot** (`GitHub.copilot`)

---

## 🔄 Git Workflow

### Create a New Branch

```bash
# Make sure you're on main
git checkout main
git pull origin main

# Create new branch (always from main)
git checkout -b feature-name
# or
git checkout -b fix-name
# or
git checkout -b chore-name
```

**Branch naming convention**:
- Features: `feature/page-name` or `feature/component-name`
- Fixes: `fix/issue-description`
- Chores: `chore/task-description`

### Make Changes

1. Edit files as needed
2. Test locally: `pnpm dev`
3. Format code: `pnpm run format`
4. Check TypeScript: `pnpm astro check`

### Create Commits

```bash
# Stage all changes
git add .

# Commit with conventional message
git commit -m "feat(pages): add contact page"
```

**Commit format** (see `.github/instructions/copilot-commit-message.md`):
```
<type>(<scope>): <description>

Examples:
feat(pages): add contact page
fix(i18n): sync translation keys
refactor(components): simplify Navigation
docs(dev): update setup instructions
```

**Types**: `feat`, `fix`, `refactor`, `perf`, `docs`, `style`, `test`, `build`, `ci`, `chore`, `revert`

### Push and Create Pull Request

```bash
# Push your branch
git push origin feature-name

# Go to GitHub and create PR
# (GitHub shows link in terminal after push)
```

---

## 🧪 Before Submitting PR

### Checklist

- [ ] Code builds: `pnpm build`
- [ ] Dev server runs: `pnpm dev`
- [ ] TypeScript valid: `pnpm astro check`
- [ ] Code formatted: `pnpm run format`
- [ ] All 3 locales updated (if page/translation changes)
- [ ] Tested locally at: `localhost:4321/`, `/ca/`, `/en/`
- [ ] No console errors (F12 → Console tab)

### Testing Locally

```bash
# Start dev server
pnpm dev

# Test in browser:
# - http://localhost:4321/              (Spanish)
# - http://localhost:4321/ca/           (Catalan)
# - http://localhost:4321/en/           (English)

# Click language switcher
# Verify all links work
# Check translations load correctly
```

### Production Build Test

```bash
# Build and preview production
pnpm build
pnpm preview
# Visit http://localhost:3000
# Should look identical to dev server
```

---

## 📋 Common Workflows

### Workflow 1: Add a New Page (Multiidioma)

**Option A: Using Skill (Recommended)**

Tell Copilot:
```
"Add a new page called 'Services' in Spanish, Catalan, and English"
```

**Option B: Manual Process**

1. Create 3 files:
   ```bash
   touch src/pages/services.astro
   touch src/pages/ca/services.astro
   touch src/pages/en/services.astro
   ```

2. Add same structure to each:
   ```astro
   ---
   import Layout from "../layouts/Layout.astro";
   import { getCurrentLocale, getI18n } from "../utils/i18n";

   const locale = getCurrentLocale(Astro);
   const i18n = getI18n(locale);
   ---

   <Layout>
     <main>
       <h1>{i18n.services.title}</h1>
       <!-- Add content -->
     </main>
   </Layout>
   ```

3. Add translations to all 3 JSON files:
   ```json
   // src/i18n/es.json
   {
     "services": {
       "title": "Servicios",
       "description": "..."
     }
   }
   ```

4. Update Navigation (optional):
   - Edit `src/i18n/{es,ca,en}.json` routes
   - Edit `src/components/ui/Navigation.astro`

5. Test: `pnpm dev` → http://localhost:4321/ca/services/

### Workflow 2: Add a Component

1. Create file: `src/components/MyComponent.astro`

2. Add code:
   ```astro
   ---
   import { getCurrentLocale, getI18n } from "../utils/i18n";

   const locale = getCurrentLocale(Astro);
   const i18n = getI18n(locale);
   ---

   <div>
     <h2>{i18n.myComponent.title}</h2>
   </div>
   ```

3. Add translations (if needed)

4. Use in layout or page

### Workflow 3: Update Styling

1. Edit `src/styles/global.css` or add Tailwind classes to components

2. Test: `pnpm dev`

3. Commit: `style(css): update button styling`

### Workflow 4: Fix a Bug

1. Identify issue and reproduce locally

2. Create fix branch: `git checkout -b fix/issue-name`

3. Make changes

4. Test fix: `pnpm dev`

5. Commit: `fix(component): resolve navigation highlighting`

6. Push and create PR

---

## 🚀 Deployment

### Prerequisites

- Code merged to `main` branch
- All tests pass (automated CI/CD)

### Automatic Deployment

1. Merge PR to `main`
2. GitHub Actions (CI/CD) automatically:
   - Runs `pnpm build`
   - Deploys to Netlify/Vercel
   - Site goes live

### Manual Deployment (if needed)

```bash
# Get latest main
git checkout main
git pull origin main

# Build
pnpm build

# Deploy dist/ folder to your hosting
# (Netlify: drag dist/ folder to deploy area)
```

---

## 🛠️ Useful Commands Reference

| Command | Purpose |
|---------|---------|
| `pnpm dev` | Start dev server (localhost:4321) |
| `pnpm build` | Production build (dist/ folder) |
| `pnpm preview` | Preview production build locally |
| `pnpm run format` | Format all code with Prettier |
| `pnpm astro check` | Check TypeScript validity |
| `git status` | See current changes |
| `git diff` | See exact changes made |
| `git log --oneline` | See commit history |

See [.copilot-context/commands.md](../../.copilot-context/commands.md) for complete command reference.

---

## 📚 Documentation

- **Setup**: This file (development-workflow.md)
- **Coding standards**: [NAMING_CONVENTIONS.md](../../NAMING_CONVENTIONS.md)
- **Development guide**: [DEVELOPMENT.md](../../DEVELOPMENT.md)
- **Architecture**: [ARCHITECTURE.md](../../ARCHITECTURE.md)
- **Troubleshooting**: [.copilot-context/troubleshooting.md](../../.copilot-context/troubleshooting.md)
- **Commit rules**: [copilot-commit-message.md](./copilot-commit-message.md)

---

## ❓ Need Help?

1. Check [.copilot-context/troubleshooting.md](../../.copilot-context/troubleshooting.md)
2. Read [DEVELOPMENT.md](../../DEVELOPMENT.md#troubleshooting)
3. Ask in team chat or create GitHub issue

---

## ✅ Setup Verification Checklist

After initial setup, verify:

- [ ] `pnpm install` completed successfully
- [ ] `pnpm dev` runs without errors
- [ ] http://localhost:4321 loads in browser
- [ ] Language switcher works (es/ca/en)
- [ ] `pnpm build` completes successfully
- [ ] VS Code extensions installed
- [ ] Prettier formats on save
- [ ] TypeScript IntelliSense works
- [ ] Git remote points to correct repo

If all checks pass, you're ready to start developing! 🚀
