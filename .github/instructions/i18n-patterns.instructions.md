---
applyTo: 'src/pages/**,src/i18n/**,src/utils/i18n.ts,src/components/**'
---

# i18n Patterns & Workflows

## URL Structure

```
Spanish (default):  /              (no prefix)
Catalan:            /ca/*          (prefixed)
English:            /en/*          (prefixed)
```

## Pattern 1: Getting Locale in a Component

### Option A: From Astro Context (top-level components, pages)

```astro
---
import { getCurrentLocale, getI18n } from '../utils/i18n'

const locale = getCurrentLocale(Astro)
const i18n = getI18n(locale)
---

<nav>
  <a href={i18n.routes.home}>{i18n.nav.home}</a>
</nav>
```

### Option B: From Props (nested components)

```astro
---
interface Props {
  locale: Locale
}
const { locale } = Astro.props
const i18n = getI18n(locale)
---
```

## Pattern 2: Accessing Translations

```astro
---
const i18n = getI18n(locale)
---

<!-- Simple access -->
<h1>{i18n.nav.home}</h1>

<!-- Safe access with fallback -->
<button>{i18n.cta?.primary ?? 'Click here'}</button>

<!-- In loops -->
{i18n.features.map((feature) => <li>{feature}</li>)}
```

## Pattern 3: Page-Specific Content (Hybrid i18n) ⭐

Uses **1 file per page** with all 3 languages inside. Automatically merges common i18n (nav, footer) + page-specific content.

### Structure

```
src/i18n/
  ├── es.json, ca.json, en.json     ← Common (nav, footer, UI)
  └── pages/
      ├── services.json             ← {es: {...}, ca: {...}, en: {...}}
      ├── pricing.json
      └── about.json
```

### Example: services.json

```json
{
  "es": {
    "title": "Servicios",
    "description": "Soluciones de seguridad"
  },
  "ca": {
    "title": "Serveis",
    "description": "Solucions de seguretat"
  },
  "en": {
    "title": "Services",
    "description": "Security solutions"
  }
}
```

### Usage in Page

```astro
---
import Layout from '../layouts/Layout.astro'
import { getCurrentLocale, getPageI18n } from '../utils/i18n'

const locale = getCurrentLocale(Astro)
const i18n = await getPageI18n('services', locale)
---

<Layout>
  <h1>{i18n.title}</h1>
  <p>{i18n.description}</p>
  <p>{i18n.nav.services}</p>
  {/* Common i18n also available */}
</Layout>
```

**Benefits**:

- ✅ 1 file per page (scalable)
- ✅ All languages visible at once
- ✅ Guaranteed translation completeness
- ✅ Automatic merge with common i18n

### Adding a New Page

1. **Create translations file** → `src/i18n/pages/contact.json`

   ```json
   { "es": {...}, "ca": {...}, "en": {...} }
   ```

2. **Create 3 page files** (es, ca, en)
   ```astro
   const i18n = await getPageI18n("contact", locale);
   ```

---

## Pattern 4: Blog Posts (Hybrid i18n)

### Structure

```
src/i18n/blog/
  ├── index.json            ← List of posts (per locale)
  └── posts/
      ├── post-1.json       ← {es: {...}, ca: {...}, en: {...}}
      └── post-2.json
```

### Example: blog/posts/post-1.json

```json
{
  "es": {
    "title": "Guía de Seguridad 2026",
    "content": "En 2026, la ciberseguridad..."
  },
  "ca": { "title": "Guia...", "content": "..." },
  "en": { "title": "Security Guide 2026", "content": "..." }
}
```

### Usage in Blog Post Page

```astro
---
const slug = Astro.params.slug
const i18n = await getBlogI18n(slug, locale)
---

<h1>{i18n.title}</h1>
<p>{i18n.content}</p>
```

---

## Pattern 5: Adding a New Page (Legacy: Common-Only)

### Automated (recommended)

Tell Copilot: `"Add a new page called 'Contact' in Spanish, Catalan, and English"`
Uses the `scud-astro-add-page` skill.

### Manual (if page content goes in common es.json/ca.json/en.json)

**Step 1**: Create 3 files

```bash
touch src/pages/contact.astro
touch src/pages/ca/contact.astro
touch src/pages/en/contact.astro
```

**Step 2**: Add structure to each file

```astro
---
import Layout from '../layouts/Layout.astro'
import { getCurrentLocale, getI18n } from '../utils/i18n'

const locale = getCurrentLocale(Astro)
const i18n = getI18n(locale)
---

<Layout>
  <main>
    <h1>{i18n.contact.title}</h1>
    <p>{i18n.contact.description}</p>
  </main>
</Layout>
```

**Step 3**: Add translations to all 3 JSON files

```json
// es.json: { "contact": { "title": "Contacto", "description": "..." } }
// ca.json: { "contact": { "title": "Contacte", "description": "..." } }
// en.json: { "contact": { "title": "Contact Us", "description": "..." } }
```

## Pattern 6: Adding a Component with i18n

```astro
---
import { getCurrentLocale, getI18n } from '../utils/i18n'
const locale = getCurrentLocale(Astro)
const i18n = getI18n(locale)
---

<section>
  <h2>{i18n.features.title}</h2>
  <ul>
    {
      i18n.features.items.map((item) => (
        <li>
          <>
            <h3>{item.name}</h3>
            <p>{item.description}</p>
          </>
        </li>
      ))
    }
  </ul>
</section>
```

## Pattern 7: Adding a Translation Key

1. Add to `src/i18n/es.json`
2. Add to `src/i18n/ca.json`
3. Add to `src/i18n/en.json`

**Rules**:

- Keep structure identical across all 3 files
- Keys are case-sensitive
- No trailing commas in JSON
- Restart dev server after adding keys

## Pattern 8: Using Routes in Navigation

```json
{ "routes": { "home": "/", "about": "/about/", "contact": "/contact/" } }
```

```astro
<nav>
  <a href={i18n.routes.home}>{i18n.nav.home}</a>
  <a href={i18n.routes.about}>{i18n.nav.about}</a>
</nav>
```

Routes don't have locale prefix — Astro adds it automatically.

## Pattern 9: Language Switcher

```astro
---
import { getCurrentLocale, getI18n, getRelativeLocaleUrl } from '../utils/i18n'
const currentLocale = getCurrentLocale(Astro)
const i18n = getI18n(currentLocale)
---

<div class="language-switcher">
  <a
    href={getRelativeLocaleUrl('es', Astro.url.pathname)}
    class:list={{ active: currentLocale === 'es' }}
  >
    {i18n.language.es}
  </a>
  <a
    href={getRelativeLocaleUrl('ca', Astro.url.pathname)}
    class:list={{ active: currentLocale === 'ca' }}
  >
    {i18n.language.ca}
  </a>
  <a
    href={getRelativeLocaleUrl('en', Astro.url.pathname)}
    class:list={{ active: currentLocale === 'en' }}
  >
    {i18n.language.en}
  </a>
</div>
```

## i18n Checklist

- [ ] All 3 page files created (es, ca, en)
- [ ] All 3 translation keys added
- [ ] Keys match across all locales (case-sensitive)
- [ ] No trailing commas in JSON
- [ ] Dev server restarted after adding keys
- [ ] Tested at `/`, `/ca/`, `/en/`
- [ ] Language switcher links work

## Common i18n Issues

| Problem                  | Solution                                               |
| ------------------------ | ------------------------------------------------------ |
| Key shows as `undefined` | Check key exists in JSON, valid syntax, restart server |
| Pages not showing        | Verify all 3 files exist in correct folders            |
| Routes not working       | Check JSON routes structure, no missing locales        |
| Language switcher broken | Verify `getRelativeLocaleUrl()` call                   |

See `troubleshooting.md` for detailed fixes.
