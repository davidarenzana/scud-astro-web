---
applyTo: "src/**"
---

# Code Style & Naming Conventions

## File & Directory Naming

### Components (Astro files)
```
✅ PascalCase:  Header.astro, ButtonGradient.astro, LanguageSwitcher.astro
❌ Wrong:       header.astro, button-gradient.astro
```

### Directories
```
✅ kebab-case:  src/components/sections/, src/components/ui/
❌ Wrong:       src/components/Sections/, src/components/UI/
```

### Utilities (TypeScript)
```
✅ camelCase for function exports:  src/utils/i18n.ts
✅ PascalCase for class exports:    src/utils/Logger.ts
```

## Variables & Functions

### Variables — `camelCase`
```typescript
const userLocale = "es";
let isLoading = false;
```

### Constants — `UPPER_SNAKE_CASE`
```typescript
const DEFAULT_LOCALE = "es";
const SUPPORTED_LOCALES = ["es", "ca", "en"];
```

### Functions — `camelCase`
```typescript
function getCurrentLocale() { ... }
function handleLanguageChange(newLocale) { ... }
```

### Boolean Variables — prefix with `is`, `has`, `should`, `can`
```typescript
const isLoading = true;
const hasError = false;
const shouldRetry = true;
```

### Event Handlers — `handle<EventName>`
```typescript
function handleClick() { ... }
function handleLanguageChange(locale) { ... }
```

## Types & Interfaces

### Type Definitions — `PascalCase`
```typescript
type Locale = "es" | "ca" | "en";
interface HeaderProps {
  locale: Locale;
  title: string;
}
```

### Component Props — `<ComponentName>Props` (no `I` prefix)
```typescript
interface NavigationProps {
  locale: Locale;
  items: NavItem[];
}
```

## Astro Components

### Structure
```astro
---
// 1. Astro/layout imports
import Layout from "../layouts/Layout.astro";
import Header from "../components/sections/Header.astro";

// 2. Utility imports
import { getCurrentLocale, getI18n } from "../utils/i18n";

// 3. Type imports
import type { Locale } from "../types";

// 4. Asset imports
import logo from "../assets/logo.svg";

// Props interface
interface Props {
  locale: Locale;
  title: string;
  isActive?: boolean;
}

// Destructure props
const { locale, title, isActive = false } = Astro.props;

// Logic
const i18n = getI18n(locale);
---

<div>
  <h1>{title}</h1>
</div>
```

### Props with i18n
```astro
---
// ✅ Top-level component: get locale from Astro
const locale = getCurrentLocale(Astro);
const i18n = getI18n(locale);

// ✅ Nested component: receive locale as prop
const { locale } = Astro.props;
const i18n = getI18n(locale);
```

## Translation Keys

### Structure — `section.key` (lowercase, dot-notation)
```json
{
  "nav": { "home": "Inicio", "about": "Acerca de" },
  "cta": { "primary": "Comenzar" },
  "footer": { "copyright": "© 2026 Scud Security" }
}
```

### Key naming — camelCase within dots
```
✅ "nav.home", "cta.primaryButton", "footer.copyrightNotice"
❌ "nav_home", "cta_primary_button", "footer-copyright-notice"
```

### File organization — group by section
```json
{
  "nav": { },       // Navigation
  "header": { },    // Header section
  "hero": { },      // Hero section
  "cta": { },       // Call-to-action
  "features": { },  // Features section
  "footer": { },    // Footer section
  "common": { },    // Common words (Yes, No, Close)
  "routes": { }     // URL paths
}
```

## Formatting

- **Indentation**: 2 spaces
- **Line endings**: LF (Unix)
- **Charset**: UTF-8
- **Formatter**: Prettier (auto on save)
- **Prettier config**: semi: true, singleQuote: true, trailingComma: "es5", printWidth: 100, tabWidth: 2

## Quick Reference

| Element | Convention | Example |
|---------|-----------|---------|
| Component file | `PascalCase` | `Header.astro` |
| Directory | `kebab-case` | `src/components/ui/` |
| Function | `camelCase` | `getCurrentLocale()` |
| Variable | `camelCase` | `userLocale` |
| Constant | `UPPER_SNAKE_CASE` | `DEFAULT_LOCALE` |
| Type/Interface | `PascalCase` | `Locale`, `HeaderProps` |
| Boolean | `is/has/should/can` | `isLoading`, `hasError` |
| Event handler | `handle<Name>` | `handleClick()` |
| Translation key | `section.key` | `nav.home` |
