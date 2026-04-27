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

## Pattern 3: Adding a New Page

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

**Step 3**: Add translations to `src/i18n/common.json`

```json
{
  "es": { "contact": { "title": "Contacto", "description": "..." }, ... },
  "ca": { "contact": { "title": "Contacte", "description": "..." }, ... },
  "en": { "contact": { "title": "Contact Us", "description": "..." }, ... }
}
```

**Notes**:
- All translations go in a single `common.json` file with locale keys (es, ca, en)
- Keep structure identical across all 3 locales
- Keys are case-sensitive
- No trailing commas in JSON
- Restart dev server after adding keys

## Pattern 4: Adding a Component with i18n

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

## Pattern 5: Adding a Translation Key

All translations are stored in `src/i18n/common.json` with a structure organized by locale:

```json
{
  "es": { "section": { "key": "Spanish text" } },
  "ca": { "section": { "key": "Catalan text" } },
  "en": { "section": { "key": "English text" } }
}
```

**Steps**:

1. Open `src/i18n/common.json`
2. Add your key to all 3 locale sections (es, ca, en) - Keep structure identical
3. Restart dev server: `pnpm dev`
4. Use in components: `{i18n.section.key}`

**Rules**:

- Keep structure identical across all 3 locales
- Keys are case-sensitive
- No trailing commas in JSON
- Restart dev server after adding keys
- Always update all 3 locales (es, ca, en) simultaneously

## Pattern 6: Using Routes in Navigation

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

## Pattern 7: Language Switcher

```astro
---
import { getRelativeLocaleUrl } from 'astro:i18n'
import { getCurrentLocale, getI18n } from '../utils/i18n'

const currentLocale = getCurrentLocale(Astro)
const i18n = getI18n(currentLocale)

// Remove locale prefix from URL for proper URL construction
const pathWithoutLocale =
  Astro.url.pathname
    .replace(/^\/(es|ca|en)/, '') // Remove /es, /ca, /en prefix
    .replace(/\/$/, '') || '/' // Keep single / at root
---

<div class="language-switcher">
  <a
    href={getRelativeLocaleUrl('es', pathWithoutLocale)}
    class:list={{ active: currentLocale === 'es' }}
  >
    {i18n.language.es}
  </a>
  <a
    href={getRelativeLocaleUrl('ca', pathWithoutLocale)}
    class:list={{ active: currentLocale === 'ca' }}
  >
    {i18n.language.ca}
  </a>
  <a
    href={getRelativeLocaleUrl('en', pathWithoutLocale)}
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
