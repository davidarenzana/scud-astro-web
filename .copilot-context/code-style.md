# Code Style & Conventions

Quick reference for code standards in scud-astro-web. Full details in [NAMING_CONVENTIONS.md](../NAMING_CONVENTIONS.md).

## 📁 File & Directory Naming

### Components (Astro files)
```astro
✅ CORRECT:
  src/components/Header.astro
  src/components/Navigation.astro
  src/components/sections/Footer.astro
  src/components/ui/ButtonGradient.astro

❌ INCORRECT:
  src/components/header.astro         (lowercase)
  src/components/button-gradient.astro (kebab-case)
```

### Directories
```
✅ CORRECT:
  src/components/sections/
  src/components/ui/
  src/i18n/
  src/utils/

❌ INCORRECT:
  src/components/Sections/  (PascalCase)
  src/I18n/                 (PascalCase)
```

### Utilities (TypeScript files)
```typescript
✅ CORRECT:
  src/utils/i18n.ts         (camelCase for functions)
  src/utils/Logger.ts       (PascalCase for classes)

❌ INCORRECT:
  src/utils/getI18n.ts      (redundant "get" prefix)
  src/utils/logger.ts       (should be Logger.ts)
```

---

## 🔤 Variable & Function Names

### Variables
```typescript
✅ CORRECT:
  const userLocale = "es";
  let isLoading = false;
  const defaultLocale = "es";

❌ INCORRECT:
  const user_locale = "es";
  let isloading = false;
  const default_locale = "es";
```

### Constants
```typescript
✅ CORRECT:
  const DEFAULT_LOCALE = "es";
  const SUPPORTED_LOCALES = ["es", "ca", "en"];
  const API_BASE_URL = "https://api.example.com";

❌ INCORRECT:
  const defaultLocale = "es";  (use UPPER_SNAKE_CASE)
  const supportedLocales = [...];
```

### Functions
```typescript
✅ CORRECT:
  function getCurrentLocale() { ... }
  function getI18n(locale) { ... }
  function handleLanguageChange(newLocale) { ... }

❌ INCORRECT:
  function GetCurrentLocale() { ... }
  function get_i18n() { ... }
  function handle_language_change() { ... }
```

### Boolean Variables
```typescript
✅ CORRECT:
  const isLoading = true;
  const hasError = false;
  const shouldRetry = true;
  const canEdit = user.permissions.includes("edit");

❌ INCORRECT:
  const loading = true;   (unclear boolean)
  const error = false;
  const retry = true;
```

### Event Handlers
```typescript
✅ CORRECT:
  function handleClick() { ... }
  function handleLanguageChange(locale) { ... }
  const onSubmit = (data) => { ... };

❌ INCORRECT:
  function onClick() { ... }  (too generic)
  function languageChange() { ... }
```

---

## 🏗️ Types & Interfaces

### Type Definitions
```typescript
✅ CORRECT:
  type Locale = "es" | "ca" | "en";
  interface HeaderProps {
    locale: Locale;
    title: string;
  }
  type TranslationObject = Record<string, string>;

❌ INCORRECT:
  type locale = "es" | "ca" | "en";          (lowercase)
  interface headerProps { ... }               (should be PascalCase)
  type translation_object = { ... };          (should use camelCase)
```

### Component Props
```typescript
✅ CORRECT:
  interface NavigationProps {
    locale: Locale;
    items: NavItem[];
  }

  // Usage:
  const { locale, items } = Astro.props;

❌ INCORRECT:
  interface Navigation { ... }       (ambiguous, not clearly props)
  interface NavigationPropsInterface { ... }  (redundant)
```

---

## 🎨 Astro Components

### Component Structure
```astro
---
// Import order: React/vendor → local
import Layout from "../layouts/Layout.astro";
import { getCurrentLocale, getI18n } from "../utils/i18n";

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

<!-- Template -->
<div>
  <h1>{title}</h1>
</div>
```

### Props with i18n
```astro
---
// ✅ CORRECT: Pass locale as prop
const { locale } = Astro.props;
const i18n = getI18n(locale);
---

// ❌ INCORRECT: Don't call Astro twice
// const locale = getCurrentLocale(Astro);
// const i18n = getI18n(locale);
// (already have it from parent)
```

---

## 🌍 Translation Keys

### Structure
```json
✅ CORRECT:
{
  "nav": {
    "home": "Inicio",
    "about": "Acerca de"
  },
  "cta": {
    "primary": "Comenzar",
    "secondary": "Más información"
  },
  "footer": {
    "copyright": "© 2026 Scud Security"
  }
}

❌ INCORRECT:
{
  "Nav": { ... },           (sections uppercase)
  "nav": {
    "Home": "Inicio",       (keys uppercase)
    "home_link": "Inicio"   (underscores)
  }
}
```

### Naming Pattern
```json
✅ CORRECT:
  "nav.home"
  "cta.primaryButton"
  "footer.copyrightNotice"
  "error.invalidEmail"
  "success.profileUpdated"

❌ INCORRECT:
  "nav_home"
  "cta_primary_button"
  "footer-copyright-notice"
  "error__invalid_email"
```

### Usage in Components
```astro
---
const i18n = getI18n(locale);
---

<h1>{i18n.nav.home}</h1>           <!-- ✅ Nested access -->
<p>{i18n.error.invalidEmail}</p>
```

---

## 📄 Import Organization

```typescript
// 1. Astro imports
import Layout from "../layouts/Layout.astro";
import Header from "../components/sections/Header.astro";

// 2. Utility imports
import { getCurrentLocale, getI18n } from "../utils/i18n";

// 3. Type imports
import type { Locale } from "../types";

// 4. Asset imports
import logo from "../assets/logo.svg";
```

---

## 🎯 Formatting Rules

- **Indentation**: 2 spaces (enforced by `.editorconfig`)
- **Line endings**: LF (Unix style)
- **Charset**: UTF-8
- **Formatter**: Prettier (auto on save in VSCode)
- **Import order**: See Import Organization above

### Prettier Config
```json
{
  "semi": true,
  "singleQuote": true,
  "trailingComma": "es5",
  "printWidth": 100,
  "tabWidth": 2
}
```

---

## ✅ Quick Checklist

Before committing:

- [ ] Component files: `PascalCase.astro`
- [ ] Directories: `kebab-case`
- [ ] Functions: `camelCase`
- [ ] Constants: `UPPER_SNAKE_CASE`
- [ ] Types: `PascalCase`
- [ ] Translation keys: `section.key` (lowercase, dots)
- [ ] Boolean vars: `is/has/should/can/do` prefix
- [ ] Prettier formatted (auto on save)
- [ ] No trailing whitespace (enforced)
- [ ] All imports organized (Astro → utils → types → assets)

---

## 📚 Full Reference

For complete details, see [NAMING_CONVENTIONS.md](../NAMING_CONVENTIONS.md)
