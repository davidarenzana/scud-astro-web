# Project Architecture

## Routing & i18n

### URL Structure

```
/                 → Spanish (es)
/ca/*             → Catalan
/en/*             → English
```

### Why This?

- Spanish is default (primary market)
- No prefix = cleaner URLs for default lang
- SEO: Automatic hreflang cross-links
- Astro native `astro:i18n` module (no dependencies)

### File Structure

```
src/pages/
  index.astro        → / (es)
  ca/
    index.astro      → /ca/ (ca)
  en/
    index.astro      → /en/ (en)
```

## i18n Implementation

### Translation Files

```
src/i18n/
  es.json  # Spanish strings + routes
  ca.json  # Catalan strings + routes
  en.json  # English strings + routes
```

Structure:

```json
{
  "nav": { "home": "...", "about": "..." },
  "language": { "es": "...", "ca": "...", "en": "..." },
  "routes": { "home": "/", "about": "/about/", ... }
}
```

### Utilities (`src/utils/i18n.ts`)

| Function                      | Input         | Output               | Use                     |
| ----------------------------- | ------------- | -------------------- | ----------------------- |
| `getLocaleFromPath(pathname)` | "/ca/about"   | "ca"                 | Extract locale from URL |
| `getCurrentLocale(astro)`     | Astro context | "es" \| "ca" \| "en" | Get page's locale       |
| `getI18n(locale)`             | "es"          | Translation object   | Access strings          |

Usage in components:

```astro
---
const locale = getCurrentLocale(Astro);
const i18n = getI18n(locale);
---

<p>{i18n.nav.home}</p>
```

## Components

### Hierarchy

```
Layout.astro
├── Header.astro
│   ├── Navigation.astro
│   └── LanguageSwitcher.astro
└── <page-content>
```

### Layout (`src/layouts/Layout.astro`)

- Sets `<html lang="">` per locale
- Adds hreflang links for all locales (SEO)
- Canonical tag

### Header (`src/components/sections/Header.astro`)

- Imports Navigation + LanguageSwitcher
- Receives locale as prop

### LanguageSwitcher (`src/components/LanguageSwitcher.astro`)

- 3 language links
- Highlights current locale
- Uses `getRelativeLocaleUrl()` for correct paths

## Configuration

### astro.config.mjs

```js
i18n: {
  locales: ["es", "ca", "en"],
  defaultLocale: "es",
  routing: {
    prefixDefaultLocale: false,  // No /es/ prefix
    redirectToDefaultLocale: false
  }
}

vite.resolve.alias["@"] = "./src"  // @ imports
```

### tsconfig.json

```json
"paths": { "@/*": ["src/*"] }  // @ alias
```

## Adding New Features

### New Page

1. Create `src/pages/mypage.astro` (es)
2. Create `src/pages/ca/mypage.astro` (ca)
3. Create `src/pages/en/mypage.astro` (en)
4. Update `src/i18n/{es,ca,en}.json`

### New Component

- Use `getCurrentLocale(Astro)` to get locale
- Use `getI18n(locale)` for strings
- Pass locale as prop when needed

### New Translation Key

1. Add to all 3 files: `src/i18n/{es,ca,en}.json`
2. Access via: `i18n.section.key`

## Tech Stack

| Tool         | Purpose         | Version |
| ------------ | --------------- | ------- |
| Astro        | Framework       | 6.1.7   |
| Tailwind CSS | Styling         | 4.2.2   |
| TypeScript   | Type safety     | Latest  |
| pnpm         | Package manager | Latest  |
| Prettier     | Code formatting | 3.8.3   |

## SEO

- **hreflang**: Auto-generated in Layout.astro
- **Canonical**: Set per page
- **HTML lang**: "es-ES" \| "ca-ES" \| "en-US"
- **Locale prefix**: Astro native routing

## Development Workflow

1. **Branch**: `git checkout -b feature/my-feature`
2. **Code**: Add components/pages/i18n
3. **Commit**: `feat(scope): description` (max 50 chars)
4. **Test**: `pnpm dev` + browser test
5. **Build**: `pnpm build` (check no errors)
6. **PR**: Include screenshots for UI changes

---

**References**: `.agent.md` · `.copilot-instructions` · `.github/instructions/`
