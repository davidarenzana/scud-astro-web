# i18n Patterns & Workflows

Practical patterns for working with multilingual content in scud-astro-web.

## 📍 URL Structure

```
Spanish (default):  /                 (no prefix)
Catalan:            /ca/*             (prefixed)
English:            /en/*             (prefixed)

Examples:
  /                     → Spanish home
  /ca/                  → Catalan home
  /en/                  → English home
  /about                → Spanish about
  /ca/about             → Catalan about
  /en/about             → English about
```

---

## 🛠️ Pattern 1: Getting Locale in a Component

### Option A: From Astro Context
```astro
---
import { getCurrentLocale, getI18n } from "../utils/i18n";

const locale = getCurrentLocale(Astro);
const i18n = getI18n(locale);
---

<nav>
  <a href={i18n.routes.home}>{i18n.nav.home}</a>
  <a href={i18n.routes.about}>{i18n.nav.about}</a>
</nav>
```

### Option B: From Props (Nested Component)
```astro
---
// src/components/Navigation.astro
interface Props {
  locale: Locale;
}

const { locale } = Astro.props;
const i18n = getI18n(locale);
---

<nav>{/* ... */}</nav>
```

### When to Use Each

- **Option A** (getCurrentLocale): Top-level components, page routes
- **Option B** (pass as prop): Nested components, reusable components

---

## 🛠️ Pattern 2: Accessing Translations

### Nested Object Access
```astro
---
const i18n = getI18n("es");
---

<!-- Simple access -->
<h1>{i18n.nav.home}</h1>               <!-- "Inicio" -->

<!-- Conditional -->
{isActive && <span>{i18n.status.active}</span>}

<!-- In loops -->
{i18n.features.map(feature => <li>{feature}</li>)}
```

### Safe Access (with Fallback)
```astro
---
const i18n = getI18n(locale);
const label = i18n.cta?.primary ?? "Click here";  <!-- Fallback -->
---

<button>{label}</button>
```

---

## 🛠️ Pattern 3: Adding a New Page (Multiidioma)

### Manual Process (3 steps)

**Step 1**: Create 3 files

```bash
# Spanish
touch src/pages/contact.astro

# Catalan
touch src/pages/ca/contact.astro

# English
touch src/pages/en/contact.astro
```

**Step 2**: Add same structure to each file

```astro
---
// src/pages/contact.astro
import Layout from "../layouts/Layout.astro";
import { getCurrentLocale, getI18n } from "../utils/i18n";

const locale = getCurrentLocale(Astro);
const i18n = getI18n(locale);
---

<Layout>
  <main>
    <h1>{i18n.contact.title}</h1>
    <p>{i18n.contact.description}</p>
    <!-- Add content -->
  </main>
</Layout>
```

**Step 3**: Add translations

```json
// src/i18n/es.json
{
  "contact": {
    "title": "Contacto",
    "description": "Ponte en contacto con nosotros"
  }
}

// src/i18n/ca.json
{
  "contact": {
    "title": "Contacte",
    "description": "Poseu-vos en contacte amb nosaltres"
  }
}

// src/i18n/en.json
{
  "contact": {
    "title": "Contact Us",
    "description": "Get in touch with us"
  }
}
```

### Automated Process (Using Skill)

Tell Copilot:
```
"Add a new page called 'Contact' in Spanish, Catalan, and English"
```

The `scud-astro-add-page` skill:
- ✅ Creates 3 `.astro` files with Layout template
- ✅ Generates translation key structure in 3 JSON files
- ✅ Validates everything is synced

**See**: [.agents/README.md](../.agents/README.md) for skill details

---

## 🛠️ Pattern 4: Adding a Component with i18n

```astro
---
// src/components/Features.astro
import { getCurrentLocale, getI18n } from "../utils/i18n";

const locale = getCurrentLocale(Astro);
const i18n = getI18n(locale);
---

<section class="features">
  <h2>{i18n.features.title}</h2>
  <ul>
    {i18n.features.items.map(item => (
      <li>
        <h3>{item.name}</h3>
        <p>{item.description}</p>
      </li>
    ))}
  </ul>
</section>
```

### Translation Structure
```json
{
  "features": {
    "title": "Features",
    "items": [
      {
        "name": "Fast",
        "description": "Lightning quick performance"
      },
      {
        "name": "Secure",
        "description": "Enterprise-grade security"
      }
    ]
  }
}
```

---

## 🛠️ Pattern 5: Adding a Translation Key

### Process

1. **Add to Spanish** (`src/i18n/es.json`)
   ```json
   {
     "newSection": {
       "title": "Nuevo título",
       "description": "Descripción"
     }
   }
   ```

2. **Add to Catalan** (`src/i18n/ca.json`)
   ```json
   {
     "newSection": {
       "title": "Nou títol",
       "description": "Descripció"
     }
   }
   ```

3. **Add to English** (`src/i18n/en.json`)
   ```json
   {
     "newSection": {
       "title": "New Title",
       "description": "Description"
     }
   }
   ```

### Important
- **Keep structure identical** across all 3 files
- **Keys must match** (case-sensitive)
- **All 3 files** must have the new key
- **No trailing commas** in JSON

### Verification
```bash
# After editing, restart dev server
Ctrl+C
pnpm dev
```

---

## 🛠️ Pattern 6: Using Routes in Navigation

### Translation Structure
```json
{
  "routes": {
    "home": "/",
    "about": "/about/",
    "contact": "/contact/"
  }
}
```

### Component Usage
```astro
---
const locale = getCurrentLocale(Astro);
const i18n = getI18n(locale);
---

<nav>
  <a href={i18n.routes.home}>{i18n.nav.home}</a>
  <a href={i18n.routes.about}>{i18n.nav.about}</a>
  <a href={i18n.routes.contact}>{i18n.nav.contact}</a>
</nav>
```

### Key Points
- Routes are **only in JSON** (never hardcode URLs)
- Routes **don't have locale prefix** (Astro adds it automatically)
- Spanish uses `/route/`, Catalan uses `/ca/route/`, etc.

---

## 🛠️ Pattern 7: Conditional Translation (A/B Testing)

```astro
---
const locale = getCurrentLocale(Astro);
const i18n = getI18n(locale);

// Show different CTA based on locale
const ctaText = locale === "es" 
  ? i18n.cta.spanish_specific
  : i18n.cta.default;
---

<button>{ctaText}</button>
```

### Translation Structure
```json
{
  "cta": {
    "default": "Get Started",
    "spanish_specific": "Comenzar Ahora"
  }
}
```

---

## 🛠️ Pattern 8: Link Between Locales (Language Switcher)

### Implementation
```astro
---
// src/components/LanguageSwitcher.astro
import { getCurrentLocale, getI18n, getRelativeLocaleUrl } from "../utils/i18n";

const currentLocale = getCurrentLocale(Astro);
const i18n = getI18n(currentLocale);
---

<div class="language-switcher">
  <a 
    href={getRelativeLocaleUrl("es", Astro.url.pathname)}
    class:list={{ active: currentLocale === "es" }}
  >
    {i18n.language.es}
  </a>
  
  <a 
    href={getRelativeLocaleUrl("ca", Astro.url.pathname)}
    class:list={{ active: currentLocale === "ca" }}
  >
    {i18n.language.ca}
  </a>
  
  <a 
    href={getRelativeLocaleUrl("en", Astro.url.pathname)}
    class:list={{ active: currentLocale === "en" }}
  >
    {i18n.language.en}
  </a>
</div>
```

### Translation Structure
```json
{
  "language": {
    "es": "Español",
    "ca": "Català",
    "en": "English"
  }
}
```

---

## ✅ i18n Checklist

- [ ] All 3 page files created (es, ca, en)
- [ ] All 3 translation keys added (es.json, ca.json, en.json)
- [ ] Keys match across all locales (case-sensitive)
- [ ] No trailing commas in JSON
- [ ] Dev server restarted after adding keys
- [ ] Tested at `/`, `/ca/`, `/en/`
- [ ] Links work correctly in LanguageSwitcher

---

## 🐛 Common i18n Issues

| Problem | Solution |
|---------|----------|
| Key shows as `undefined` | Check key exists in JSON, JSON syntax valid, server restarted |
| Pages not showing | Verify all 3 files exist (es, ca, en) in correct folders |
| Routes not working | Check JSON routes structure, no missing locales |
| Language switcher broken | Verify `getRelativeLocaleUrl()` call, locale format |

**See**: [troubleshooting.md](./troubleshooting.md) for detailed fixes

---

## 📚 See Also

- [DEVELOPMENT.md](../DEVELOPMENT.md#-workflows) — Full workflow documentation
- [ARCHITECTURE.md](../ARCHITECTURE.md) — Architecture decisions
- [commands.md](./commands.md) — Development commands
