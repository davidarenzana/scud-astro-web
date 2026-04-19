# Architecture & Design Decisions

This file documents key architectural decisions and design rationale for scud-astro-web.

## 🌍 i18n Strategy: Astro Native (Not i18next)

### Decision
Use **Astro 6 native i18n module** (`astro:i18n`) for multilingual support.

### Why Not i18next/next-intl?

| Factor | Astro Native | i18next | next-intl |
|--------|-------------|---------|-----------|
| **Setup complexity** | Minimal (built-in) | Medium (external) | Medium (external) |
| **Bundle size** | ~0 KB (native) | +50 KB | +40 KB |
| **Astro fit** | Perfect (1st party) | Awkward (3rd party) | Awkward (designed for Next.js) |
| **File-based routing** | Native support | Manual setup | Manual setup |
| **Maintenance** | Bundled with Astro | Separate package | Separate package |

### Rationale
- **File-based routing** is Astro's strength; native i18n integrates perfectly
- **Zero configuration** vs. hours of setup with external libraries
- **Future-proof**: Maintained by Astro core team
- **Scalability**: Works for 3–100+ locales without perf penalty

---

## 🛣️ URL Structure: Default Locale Without Prefix

### Decision
```
Spanish (default):  /                     (no /es/ prefix)
Catalan:            /ca/*                 (prefixed)
English:            /en/*                 (prefixed)
```

### Why This Pattern?

| Benefit | Impact |
|---------|--------|
| **Cleaner URLs for primary market** | `/` instead of `/es/` feels native |
| **SEO advantage** | Default locale at root domain has higher authority |
| **User experience** | Spanish users don't see language prefix (feels local) |
| **Astro-idiomatic** | Pattern recommended by Astro docs |

### Alternative Rejected: Prefix all locales

```
/es/*  /ca/*  /en/*  (rejected)
```

**Why rejected**: 
- Clutters URLs for majority users (Spanish)
- Less SEO friendly (no root-level content)
- Unnecessary redundancy

---

## 📂 File Structure: Tripled Pages for i18n

### Current Pattern

```
src/pages/
  index.astro         → / (es)
  ca/index.astro      → /ca/ (ca)
  en/index.astro      → /en/ (en)
  about.astro         → /about/ (es)
  ca/about.astro      → /ca/about/ (ca)
  en/about.astro      → /en/about/ (en)
```

### Why Triple Files?

**Astro limitation**: File-based routing requires physical files for each locale.

**Tradeoff**:
- ✅ Zero runtime overhead (static files)
- ✅ TypeScript/IntelliSense perfect for each file
- ❌ Boilerplate (90% duplicate structure)

**Mitigation**: `scud-astro-add-page` skill automates this (5 min → 30 sec).

---

## 🎨 Styling: Tailwind CSS v4

### Decision
Use **Tailwind CSS v4** with `@tailwindcss/vite` plugin.

### Why Tailwind?

| Aspect | Decision | Alternative |
|--------|----------|-------------|
| **Utility-first** | ✅ Yes (Tailwind) | Component-first (Bootstrap) |
| **Bundle size** | ✅ Tree-shakeable | Heavier (Bootstrap) |
| **Customization** | ✅ Config-driven | CSS overrides (Bootstrap) |
| **Astro fit** | ✅ Native support | Awkward integration |

### Rationale
- **Astro fit**: Perfect Vite plugin integration
- **Performance**: Only used styles in production
- **DX**: Utility classes + Tailwind IntelliSense
- **Scalability**: Easy to extend with custom utilities

---

## 🔄 Routing: Astro File-Based (No frameworks)

### Decision
Use **Astro's native file-based routing**, no Next.js/Remix/Nuxt.

### Why File-Based?

| Aspect | File-Based | Dynamic Routes |
|--------|-----------|-----------------|
| **Simplicity** | Create file = route exists | Configuration needed |
| **Clarity** | File path = URL path | Mental mapping required |
| **Type safety** | TypeScript per route | Type checking complex |
| **i18n support** | Native (astro:i18n) | Manual implementation |
| **Performance** | Static-first | SSR overhead |

### Rationale
- **Transparency**: URL structure = filesystem structure
- **i18n native**: Astro i18n built for file-based routing
- **Static-first**: Perfect for marketing sites (faster, cheaper)

---

## 🔗 SEO: Automatic hreflang + Canonical Tags

### Implementation
[Layout.astro](../src/layouts/Layout.astro) automatically:
1. Sets `<html lang="">` per locale
2. Adds `<link rel="canonical">` for each page
3. Adds `<link rel="alternate">` (hreflang) for all locales

### Why This?

| Tag | Purpose |
|-----|---------|
| **canonical** | Tell search engines: "This is the primary version" |
| **hreflang** | Tell search engines: "These are translations of same content" |
| **lang attribute** | Helps screen readers, search engines identify language |

### Benefit
✅ No duplicate content penalties  
✅ Search engines index all locales correctly  
✅ Users can see translations available  

---

## 📦 Component Architecture: Stateless, Functional

### Decision
All components are **stateless, server-rendered Astro components**.

### Why No Client-Side State?

| Aspect | Decision |
|--------|----------|
| **Client-side state** | None (yet) — complexity not needed |
| **Interactivity** | Only progressive enhancement (links, forms) |
| **Framework** | Astro components only (no React/Vue/Svelte) |
| **Performance** | Zero JavaScript by default |

### Pattern
```astro
---
// src/components/Navigation.astro
import { getCurrentLocale, getI18n } from "../utils/i18n";

const locale = getCurrentLocale(Astro);
const i18n = getI18n(locale);
---

<nav>
  {i18n.nav.items.map(item => <a>{item.label}</a>)}
</nav>
```

### Rationale
- **Marketing site focus**: Content-first, minimal interaction
- **Performance**: No JS hydration needed
- **Simplicity**: No state management overhead
- **Future-proof**: Can add islands (interactive components) later without refactoring

---

## 🌐 i18n Data: JSON Files (Not Database)

### Decision
Store translations in **JSON files** (`src/i18n/{locale}.json`), not database.

### Why JSON?

| Aspect | JSON | Database |
|--------|------|----------|
| **Simplicity** | File in repo | Need backend |
| **Version control** | Git history for translations | External history |
| **Build-time** | All keys available at compile | Runtime queries |
| **Performance** | Zero runtime overhead | Query latency |
| **Collaboration** | PR review translations | No easy diff |

### Trade-offs
✅ Simple, collaborative  
❌ Not suitable for 1000s of keys (future: consider Prismic/Contentful)

### When to migrate to CMS?
- [ ] >500 translation keys
- [ ] Non-dev team needs to edit translations
- [ ] A/B testing different translations
- [ ] Real-time translation updates

---

## 🚀 Deployment: Static (Netlify/Vercel)

### Assumption
Project deploys as **static site** (no server needed).

### Why?

| Aspect | Static | Serverless | Server |
|--------|--------|-----------|--------|
| **Cost** | Free tier available | Per-request | Always running |
| **Speed** | CDN, instant cache | Cold starts | Varies |
| **Complexity** | Zero ops | Minimal | Full ops |
| **Scaling** | Unlimited (CDN) | Auto (FaaS) | Manual |

### Rationale
- **Marketing site**: No dynamic server-side logic needed
- **Astro strength**: Static generation first-class feature
- **Cost-effective**: Free tier on Netlify/Vercel
- **Reliability**: No server downtime possible

---

## 📝 Future Considerations

### When To Reconsider Decisions

| Decision | Trigger |
|----------|---------|
| **Astro i18n** → CMS | 500+ keys, frequent translation changes |
| **File-based routes** → Dynamic | 100+ pages with similar templates |
| **Stateless components** → React islands | Significant interactivity needed |
| **JSON translations** → Database | Real-time updates, A/B testing |
| **Static site** → Server | User-specific content, personalization |

All these decisions are **reversible without major refactoring** ✅

---

## 🔗 See Also

- [ARCHITECTURE.md](../ARCHITECTURE.md) — Full technical architecture
- [DEVELOPMENT.md](../DEVELOPMENT.md) — Setup and workflows
- [code-style.md](./code-style.md) — Code conventions
