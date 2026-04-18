# Naming Conventions — scud-astro-web

## Overview

Consistent naming improves code readability, makes refactoring safer, and helps team members quickly understand code intent.

## File & Directory Names

### Components (`.astro` files)

**Rule**: `PascalCase`

```
✅ CORRECT:
  src/components/Header.astro
  src/components/ButtonGradient.astro
  src/components/LanguageSwitcher.astro
  src/components/sections/Footer.astro
  src/components/ui/Navigation.astro

❌ INCORRECT:
  src/components/header.astro
  src/components/button-gradient.astro
  src/components/language_switcher.astro
```

### Directories

**Rule**: `kebab-case` (lowercase, hyphens)

```
✅ CORRECT:
  src/components/sections/
  src/components/ui/
  src/i18n/
  src/utils/

❌ INCORRECT:
  src/components/Sections/
  src/components/UI/
  src/I18n/
  src/Utils/
```

### Layout Files

**Rule**: `PascalCase`

```
✅ CORRECT:
  src/layouts/Layout.astro
  src/layouts/BlogLayout.astro

❌ INCORRECT:
  src/layouts/layout.astro
  src/layouts/blog-layout.astro
```

### Utility/Helper Files (`.ts`)

**Rule**: `camelCase` or `PascalCase` depending on export

- **Function exports** → `camelCase`: `src/utils/i18n.ts`, `src/utils/dateFormatter.ts`
- **Class exports** → `PascalCase`: `src/utils/Logger.ts`, `src/utils/Validator.ts`

```typescript
// ✅ CORRECT: function exports → camelCase filename
// src/utils/i18n.ts
export function getCurrentLocale() { ... }
export function getI18n() { ... }

// ✅ CORRECT: class exports → PascalCase filename
// src/utils/Logger.ts
export class Logger { ... }

// ❌ INCORRECT: mixed conventions
// src/utils/getI18n.ts (redundant prefix)
// src/utils/logger.ts (should be Logger.ts if exporting class)
```

---

## JavaScript / TypeScript

### Variables

**Rule**: `camelCase`

```typescript
✅ CORRECT:
  const userLocale = "es";
  let isLoading = false;
  const defaultLocale = "es";
  const navigationItems = [...];

❌ INCORRECT:
  const user_locale = "es";
  let isloading = false;
  const default_locale = "es";
  const navigationitems = [...];
```

### Constants

**Rule**: `UPPER_SNAKE_CASE`

```typescript
✅ CORRECT:
  const DEFAULT_LOCALE = "es";
  const SUPPORTED_LOCALES = ["es", "ca", "en"];
  const API_BASE_URL = "https://api.example.com";
  const MAX_RETRIES = 3;

❌ INCORRECT:
  const defaultLocale = "es";  // Use const default for vars, CONST for constants
  const supportedLocales = [...];
  const apiBaseUrl = "...";
  const maxRetries = 3;
```

**When to use UPPER_SNAKE_CASE?**
- Values that don't change (compile-time constants)
- Configuration values
- Error codes
- Don't use for variables that change or are runtime-determined

### Functions

**Rule**: `camelCase`

```typescript
✅ CORRECT:
  function getCurrentLocale() { ... }
  function getI18n(locale) { ... }
  function handleLanguageChange(newLocale) { ... }
  function calculateTotalPrice(items) { ... }

❌ INCORRECT:
  function GetCurrentLocale() { ... }  // PascalCase only for classes
  function get_i18n() { ... }
  function handle_language_change() { ... }
  function calculate_total_price() { ... }
```

### Classes

**Rule**: `PascalCase`

```typescript
✅ CORRECT:
  class Logger { ... }
  class TranslationManager { ... }
  class DataValidator { ... }

❌ INCORRECT:
  class logger { ... }
  class translation_manager { ... }
  class dataValidator { ... }
```

### Type/Interface Definitions

**Rule**: `PascalCase`

```typescript
✅ CORRECT:
  type Locale = "es" | "ca" | "en";
  interface HeaderProps {
    locale: Locale;
    title: string;
  }
  type TranslationObject = Record<string, string>;

❌ INCORRECT:
  type locale = "es" | "ca" | "en";
  interface headerProps { ... }
  type translation_object = Record<string, string>;
```

**Optional naming convention for types:**
- Prefix with `T` for discriminating types from values: `TLocale`, `TProps`
- Or just use `PascalCase` without prefix (cleaner in this project)

```typescript
// Both are acceptable:
type Locale = "es" | "ca" | "en";
type TLocale = "es" | "ca" | "en";

// Use your preference, but be consistent
```

### Component Props Interfaces

**Rule**: `<ComponentName>Props` or `I<ComponentName>Props`

```typescript
✅ CORRECT (without I prefix):
  interface NavigationProps {
    locale: Locale;
    items: NavItem[];
  }

  interface ButtonGradientProps {
    label: string;
    onClick: () => void;
  }

✅ ALSO CORRECT (with I prefix):
  interface INavigationProps { ... }
  interface IButtonGradientProps { ... }

❌ INCORRECT:
  interface Navigation { ... }  // Ambiguous, unclear it's props
  interface ButtonGradientPropsInterface { ... }
  interface navigation_props { ... }
```

**Pick one convention and stick with it. Recommendation: `<ComponentName>Props` (no I prefix) for cleaner code.**

### Boolean Variables

**Rule**: Prefix with `is`, `has`, `should`, `can`, `do`

```typescript
✅ CORRECT:
  const isLoading = true;
  const hasError = false;
  const shouldRetry = true;
  const canEdit = user.permissions.includes("edit");
  const doRefresh = true;

❌ INCORRECT:
  const loading = true;  // Unclear boolean
  const error = false;
  const retry = true;
  const edit = true;
  const refresh = true;
```

### Event Handlers

**Rule**: `handle<EventName>` or `on<EventName>`

```typescript
✅ CORRECT:
  function handleClick() { ... }
  function handleLanguageChange(locale) { ... }
  function handleFormSubmit(data) { ... }

  // Or use on<EventName> for callbacks:
  const onLanguageChange = (locale) => { ... };

❌ INCORRECT:
  function onClick() { ... }  // Too generic
  function languageChange() { ... }
  function form_submit() { ... }
```

---

## Astro Components

### Component File Names

**Rule**: `PascalCase.astro`

```
✅ CORRECT:
  src/components/Header.astro
  src/components/Navigation.astro
  src/components/LanguageSwitcher.astro
  src/components/sections/Footer.astro

❌ INCORRECT:
  src/components/header.astro
  src/components/LanguageSwitcher.tsx  // Wrong extension
  src/components/header-component.astro
```

### Component Props

```astro
---
// ✅ CORRECT
interface Props {
  locale: Locale;
  title: string;
  isActive?: boolean;
}

const { locale, title, isActive = false } = Astro.props;

---

<div>
  <h1>{title}</h1>
</div>
```

---

## Translation Keys

### Structure

**Rule**: `section.key` (lowercase, dot-notation)

```json
✅ CORRECT:
{
  "nav": {
    "home": "Inicio",
    "about": "Acerca de",
    "services": "Servicios"
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
  "Nav": { ... },           // Sections should be lowercase
  "nav": {
    "Home": "Inicio",       // Keys should be lowercase
    "home_link": "Inicio"   // Use dots, not underscores
  }
}
```

### Key Naming

**Rule**: Descriptive, camelCase within dots

```json
✅ CORRECT:
  "nav.home"
  "cta.primaryButton"
  "footer.copyrightNotice"
  "error.invalidEmail"

❌ INCORRECT:
  "nav_home"
  "cta_primary_button"
  "footer-copyright-notice"
  "error__invalid_email"
```

### Translation File Organization

Group related translations by section:

```json
{
  "nav": { ... },          // Navigation
  "header": { ... },       // Header section
  "hero": { ... },         // Hero section
  "cta": { ... },          // Call-to-action
  "features": { ... },     // Features section
  "footer": { ... },       // Footer section
  "error": { ... },        // Error messages
  "success": { ... },      // Success messages
  "common": { ... },       // Common words (Yes, No, Close, etc.)
  "routes": { ... }        // URL paths (don't translate these)
}
```

---

## Summary Quick Reference

| Element | Convention | Example |
|---------|-----------|---------|
| Component file | `PascalCase` | `Header.astro` |
| Directory | `kebab-case` | `src/components/ui/` |
| Function | `camelCase` | `getCurrentLocale()` |
| Variable | `camelCase` | `userLocale` |
| Constant | `UPPER_SNAKE_CASE` | `DEFAULT_LOCALE` |
| Class | `PascalCase` | `Logger` |
| Type/Interface | `PascalCase` | `Locale`, `HeaderProps` |
| Boolean variable | `is/has/should/can/do` + camelCase | `isLoading`, `hasError` |
| Event handler | `handle<Name>` | `handleClick()` |
| Translation key | `section.key` (lowercase, dot) | `nav.home` |

---

## Enforcement

- **Manual Review**: During code review, check naming conventions
- **Editor Config**: `.editorconfig` ensures formatting consistency
- **Linting** (future): Consider adding ESLint with naming rules

## References

- [Google TypeScript Style Guide](https://google.github.io/styleguide/tsguide.html)
- [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript)
- [Astro Component Best Practices](https://docs.astro.build/en/basics/astro-components/)
