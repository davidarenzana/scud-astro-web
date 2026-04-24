# Troubleshooting Guide

Common issues and solutions for scud-astro-web development.

## 🔴 Component Not Recognizing Translation Key

### Symptom
```
Error: TypeError: Cannot read property 'title' of undefined
Page shows: {i18n.section.title} as literal text
```

### Causes & Solutions

**Cause 1: Key doesn't exist in JSON**
```bash
# Check if key is in file
grep "title" src/i18n/es.json

# If not found:
# 1. Add to src/i18n/es.json
# 2. Add to src/i18n/ca.json
# 3. Add to src/i18n/en.json
# 4. Restart dev server: Ctrl+C → pnpm dev
```

**Cause 2: JSON syntax error**
```json
✅ CORRECT:
{
  "section": {
    "title": "Hello"
  }
}

❌ INCORRECT:
{
  "section": {
    "title": "Hello",  ← Trailing comma
  }
}
```
→ Use JSON validator: https://jsonlint.com/

**Cause 3: Typo in key name (case-sensitive)**
```astro
<!-- File has "Title" with capital T -->
<!-- But accessing with lowercase "title" -->
{i18n.section.title}  ← Won't work if key is "Title"
```
→ Check capitalization matches exactly

**Solution**:
1. Verify JSON files have correct key
2. Check JSON syntax (no trailing commas)
3. Restart dev server: `Ctrl+C` → `pnpm dev`
4. Hard refresh browser: Cmd+Shift+R (macOS) or Ctrl+Shift+F5 (Windows)

---

## 🔴 Build Fails with Locale Error

### Symptom
```
Error: Invalid locale 'xx' — expected one of: es, ca, en
Error: astro:i18n configuration error
```

### Causes & Solutions

**Cause 1: Missing locale file**
```bash
# Check all 3 files exist:
ls -la src/pages/
ls -la src/pages/ca/
ls -la src/pages/en/

# If one is missing, create it with same structure as Spanish version
```

**Cause 2: Wrong folder structure**
```bash
✅ CORRECT:
src/pages/
  page.astro
  ca/page.astro
  en/page.astro

❌ INCORRECT:
src/pages/
  page.astro
  ca-CA/page.astro    ← Should be just "ca"
  en-US/page.astro    ← Should be just "en"
```

**Cause 3: astro.config.mjs misconfigured**
```javascript
// Check astro.config.mjs has:
i18n: {
  locales: ["es", "ca", "en"],
  defaultLocale: "es",
  routing: {
    prefixDefaultLocale: false,
    redirectToDefaultLocale: false
  }
}
```

**Solution**:
1. Verify all 3 locale folders exist under `src/pages/`
2. Check folder names are exactly: `ca/` and `en/` (no hyphens)
3. Verify `astro.config.mjs` has correct locale list
4. Rebuild: `pnpm build`

---

## 🔴 Prettier Not Formatting on Save

### Symptom
```
Code remains unformatted
No automatic fix on Ctrl+S (Cmd+S)
```

### Causes & Solutions

**Cause 1: Prettier extension not installed**
```bash
# Check if installed in VSCode
# Extensions tab → Search "prettier"
# Install "Prettier - Code formatter" by esbenp
```

**Cause 2: VSCode not using workspace Prettier**
```bash
# Check Cmd+Shift+P → "TypeScript: Select TypeScript Version"
# → Should show "Use Workspace Version"
```

**Cause 3: formatOnSave disabled**
```json
// Check .vscode/settings.json has:
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode"
}
```

**Cause 4: Prettier config conflict**
```bash
# Check for conflicting .prettierrc files
ls -la .prettierrc*

# Should have only:
# - .prettierrc.mjs (or no file — use defaults)
```

**Solution**:
1. Install Prettier extension: `esbenp.prettier-vscode`
2. Reload VSCode: Cmd+Shift+P → "Developer: Reload Window"
3. Verify `.vscode/settings.json` has Prettier settings
4. Restart Prettier: Cmd+Shift+P → "Prettier: Restart Prettier"

---

## 🔴 TypeScript Errors / IntelliSense Not Working

### Symptom
```
Red squiggles on all imports
IntelliSense doesn't suggest completions
"Cannot find module" errors
```

### Causes & Solutions

**Cause 1: Using system TypeScript, not workspace**
```bash
# VSCode needs to use workspace TypeScript
# Cmd+Shift+P → "TypeScript: Select TypeScript Version"
# → Click "Use Workspace Version"
```

**Cause 2: tsconfig.json not configured**
```bash
# Check tsconfig.json exists at project root
ls -la tsconfig.json

# Should have @ alias configured:
{
  "compilerOptions": {
    "paths": { "@/*": ["src/*"] }
  }
}
```

**Cause 3: TypeScript server crashed**
```bash
# Restart TS server:
# Cmd+Shift+P → "TypeScript: Restart TS Server"
```

**Cause 4: node_modules out of date**
```bash
# Rebuild node_modules
rm -rf node_modules
pnpm install

# Then restart VSCode
```

**Solution**:
1. Set VSCode to use workspace TypeScript (not system)
2. Verify `tsconfig.json` exists and is valid
3. Restart TS server: Cmd+Shift+P → "TypeScript: Restart TS Server"
4. If still broken, clean install:
   ```bash
   rm -rf node_modules
   pnpm install
   ```

---

## 🔴 Tailwind Classes Not Recognized / Not Applying

### Symptom
```
Tailwind IntelliSense not showing suggestions
Classes like `bg-blue-500` don't apply styling
VSCode highlights as invalid
```

### Causes & Solutions

**Cause 1: Tailwind extension not installed**
```bash
# Install: "Tailwind CSS IntelliSense" by bradlc
```

**Cause 2: tailwind.config.ts not configured**
```bash
# Check file exists:
ls -la tailwind.config.ts

# Should have content paths configured:
{
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"]
}
```

**Cause 3: @tailwindcss/vite not enabled**
```javascript
// Check astro.config.mjs has:
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  vite: {
    plugins: [tailwindcss()]
  }
});
```

**Cause 4: Dev server needs restart**
```bash
# After modifying Tailwind config:
Ctrl+C
pnpm dev
```

**Solution**:
1. Install Tailwind extension: `bradlc.vscode-tailwindcss`
2. Verify `tailwind.config.ts` exists and has content paths
3. Check `astro.config.mjs` includes Tailwind plugin
4. Restart dev server: `Ctrl+C` → `pnpm dev`

---

## 🔴 Dev Server Takes Long to Start

### Symptom
```
pnpm dev takes 10+ seconds to start
Previous startup was faster
```

### Causes & Solutions

**Cause 1: Large node_modules**
```bash
# Clear pnpm cache
pnpm store prune

# Reinstall
pnpm install
```

**Cause 2: Astro cache corrupted**
```bash
# Remove Astro cache
rm -rf .astro/

# Restart dev server
pnpm dev
```

**Cause 3: Too many files in watched directories**
```bash
# Ensure gitignore is set:
# .gitignore should have:
# node_modules/
# dist/
# .astro/
```

**Solution**:
```bash
rm -rf .astro/
pnpm store prune
pnpm dev
```

---

## 🔴 Build Succeeds but Some Pages Missing

### Symptom
```
Build completes successfully
But some routes return 404 in production
localhost:4321 works fine
```

### Causes & Solutions

**Cause 1: Not all locale files created**
```bash
# Verify all 3 files exist:
# src/pages/new-page.astro
# src/pages/ca/new-page.astro
# src/pages/en/new-page.astro

# If any missing, build won't include that route
```

**Cause 2: Astro routing configuration issue**
```bash
# Check astro.config.mjs routing:
routing: {
  prefixDefaultLocale: false,
  redirectToDefaultLocale: false
}

# If changed, rebuild:
rm -rf dist/
pnpm build
```

**Solution**:
1. Verify all 3 page files exist
2. Rebuild from scratch: `rm -rf dist/ && pnpm build`
3. Verify generated HTML: `ls -la dist/`

---

## 🔴 Translation Keys Out of Sync

### Symptom
```
One locale has key, others don't
JSON files have different structures
Components show undefined for some locales
```

### Causes & Solutions

**Check all JSON files have same keys**:
```bash
# Compare files side-by-side
# macOS/Linux:
diff <(jq 'keys' src/i18n/es.json | sort) \
     <(jq 'keys' src/i18n/ca.json | sort)

# If different, manually edit to match
```

**Find missing keys**:
```bash
# In each JSON file, search for keys in others
grep "section.key" src/i18n/*.json
# Should appear in all 3 files
```

**Solution**:
1. Compare translation files manually
2. Ensure all have identical key structure
3. Add missing keys to all locales
4. Restart dev server: `Ctrl+C` → `pnpm dev`
5. Test all locales: `localhost:4321/`, `/ca/`, `/en/`

---

## 🟡 Performance: Build Takes Too Long

### Symptom
```
pnpm build takes >30 seconds
Expected ~5 seconds
```

### Causes & Solutions

**Cause 1: Too many components**
```bash
# Check component count
find src/components -name "*.astro" | wc -l

# If >50 components, consider splitting into separate projects
```

**Cause 2: Large assets in public/**
```bash
# Check image sizes
du -sh public/

# Optimize images:
# - Use WebP format
# - Compress with TinyPNG or ImageOptim
```

**Cause 3: Unused dependencies**
```bash
# Check package.json
# Remove unused packages

# Rebuild
pnpm install
pnpm build
```

**Solution**: Profile with build time analysis (see Astro docs)

---

## 📚 More Help

- **README.md**: Setup & project structure
- **Astro Docs**: https://docs.astro.build/
- **Tailwind Docs**: https://tailwindcss.com/
- **GitHub Issues**: Search project issues for common problems

---

## ✅ Quick Troubleshooting Checklist

When something breaks:
- [ ] Restart dev server: `Ctrl+C` → `pnpm dev`
- [ ] Hard refresh browser: Cmd+Shift+R (macOS) or Ctrl+Shift+F5 (Windows)
- [ ] Check console for error messages (F12 → Console tab)
- [ ] Verify file exists and has correct path
- [ ] Check for typos (case-sensitive)
- [ ] Restart VS Code if editor shows wrong errors
- [ ] Clean cache: `rm -rf .astro/ dist/`
- [ ] Rebuild: `pnpm build`
