# scud-astro-add-page — Skill for Adding Multiidioma Pages

## Purpose

Automate the creation of new multiidioma (multilingual) pages in the scud-astro-web project. This skill eliminates boilerplate and synchronization errors when adding pages to the Astro i18n routing structure.

## When to Use

Ask Copilot any of these:
- "Add a new page called 'Contact' in Spanish, Catalan, and English"
- "Create an 'About Us' page with i18n support"
- "Add a 'Services' page multiidioma"
- "I need a new page 'Features' in all three languages"

## What This Skill Does

### Automated Actions

When you provide:
- **Page name** (e.g., "contact", "about-us", "services")
- **English page title** (e.g., "Contact Us")

The skill:

1. ✅ **Creates 3 `.astro` files**
   - `src/pages/{page}.astro` (Spanish — default locale)
   - `src/pages/ca/{page}.astro` (Catalan)
   - `src/pages/en/{page}.astro` (English)

2. ✅ **Generates Layout template** in each file
   - Imports `Layout` component
   - Sets up basic page structure with placeholder content
   - Includes i18n integration (`getCurrentLocale`, `getI18n`)

3. ✅ **Creates base translation keys** in all 3 JSON files
   - `src/i18n/es.json`
   - `src/i18n/ca.json`
   - `src/i18n/en.json`

   Structure:
   ```json
   {
     "{pageSection}": {
       "title": "Translated title...",
       "description": "Translated description..."
     }
   }
   ```

4. ✅ **Validates file structure**
   - Confirms all 3 `.astro` files were created
   - Confirms all translation keys are present in all 3 JSON files
   - Shows any missing keys

5. ⚠️ **Optional: Link in Navigation** (manual step if needed)
   - Provides instructions to add page to navigation menu
   - Updates `src/i18n/{es,ca,en}.json` routes

## Workflow

### Input Information

Before invoking, have ready:

1. **Page slug/filename** (e.g., `contact`, `about-us`, `features`)
   - Use kebab-case, lowercase
   - This becomes the URL: `/contact/`, `/ca/contact/`, `/en/contact/`

2. **Page title** (e.g., "Contact", "About Us")
   - English title — the skill will translate to Spanish and Catalan
   - Used as placeholder in translation files

3. **(Optional) Page description** (e.g., "Get in touch with us")
   - Helps skill generate better placeholder translations
   - Can be updated later

### Execution Steps

**Step 1**: Provide page information

```
"Add a new page:
- Slug: contact
- Title: Contact Us
- Description: Get in touch with the Scud Security team"
```

**Step 2**: Skill creates files and shows summary

```
✅ Created 3 page files:
  - src/pages/contact.astro
  - src/pages/ca/contact.astro
  - src/pages/en/contact.astro

✅ Added base translations to:
  - src/i18n/es.json (contact.title, contact.description)
  - src/i18n/ca.json (contact.title, contact.description)
  - src/i18n/en.json (contact.title, contact.description)

📝 Next steps:
1. Edit the page content in src/pages/contact.astro
2. Update translations in src/i18n/{es,ca,en}.json
3. (Optional) Add link to navigation menu
```

**Step 3**: You customize

- Open the generated `.astro` files and add your content
- Update translations in the JSON files (skill provides templates)
- Optionally add navigation links

## Generated File Examples

### Page File Example

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
    
    <!-- Add your content here -->
  </main>
</Layout>
```

### Translation File Example

```json
// src/i18n/es.json — (Spanish added by skill)
{
  "contact": {
    "title": "Contacto",
    "description": "Ponte en contacto con el equipo de Scud Security"
  },
  // ... other keys ...
}

// src/i18n/ca.json — (Catalan added by skill)
{
  "contact": {
    "title": "Contacte",
    "description": "Poseu-vos en contacte amb l'equip de Scud Security"
  },
  // ... other keys ...
}

// src/i18n/en.json — (English added by skill)
{
  "contact": {
    "title": "Contact Us",
    "description": "Get in touch with the Scud Security team"
  },
  // ... other keys ...
}
```

## Validation Checks

The skill validates:

- ✅ Page slug is valid (kebab-case, no spaces/special chars)
- ✅ All 3 `.astro` files were created successfully
- ✅ All 3 JSON translation files exist
- ✅ All translation keys are synchronized across locales
- ❌ Warns if page slug already exists (prevents overwriting)
- ❌ Warns if translation keys already exist

## Limitations & Notes

### What This Skill Does NOT Do

- ❌ Does not translate user content (only generates placeholders)
- ❌ Does not automatically add navigation links (you must update `Navigation.astro` manually)
- ❌ Does not create nested routes (e.g., `/blog/post-slug/`)
- ❌ Does not handle dynamic routing with `[param].astro`
- ❌ Does not update build configuration or middleware

### Placeholders

The skill generates English → Spanish/Catalan via basic translation patterns:

- **Simple English titles** translate well (e.g., "Contact" → "Contacto")
- **Complex descriptions** generate placeholder text that you **must update manually**
- Always review translated placeholders before publishing

### Sync Your Translations

After skill creation:

1. Open each JSON file and review generated translations
2. Update placeholder translations with accurate Catalan/Spanish copies
3. Ensure JSON is valid (no syntax errors)

## Common Workflows

### Adding a Simple Page (No Special Content)

```
User: "Add a 'Privacy Policy' page in all three languages"

Skill:
1. Creates src/pages/privacy-policy.astro (es), ca/privacy-policy.astro, en/privacy-policy.astro
2. Adds "privacyPolicy.title", "privacyPolicy.description" to all JSON files
3. Provides template page with placeholder

User: 
1. Edits page content in the .astro file
2. Updates translations in JSON files
3. Done ✅
```

### Adding a Complex Page (Multiple Sections)

```
User: "Add a 'Features' page with sections for description, benefits, and CTA"

Skill:
1. Creates base files (same as above)
2. Adds base keys: "features.title", "features.description"

User:
1. Edits .astro file to add multiple sections
2. Manually adds more keys to JSON: "features.benefits", "features.ctaLabel", etc.
3. Translates each section
4. Done ✅
```

### Adding a Page with Route in Navigation

```
User: "Add a 'Pricing' page and add it to the main navigation"

Skill:
1. Creates 3 page files + translations (standard)
2. Provides instructions for manual navigation update:
   
   "To add to navigation menu:
   1. Edit src/i18n/es.json → add to routes: "pricing": "/pricing/"
   2. Edit src/i18n/ca.json → add to routes: "pricing": "/ca/pricing/"
   3. Edit src/i18n/en.json → add to routes: "pricing": "/en/pricing/"
   4. Update src/components/ui/Navigation.astro to include pricing link"

User:
1. Follows instructions to add navigation entry
2. Done ✅
```

## Troubleshooting

### Problem: "Page slug already exists"

**Solution**: Use a different slug, or manually delete the old page files before re-running skill.

### Problem: Translation keys not showing in page

**Solution**:
1. Verify JSON keys are spelled correctly (case-sensitive)
2. Check JSON files for syntax errors (trailing commas, etc.)
3. Restart dev server: `Ctrl+C` → `pnpm dev`

### Problem: Astro build fails after adding page

**Solution**:
1. Check all 3 `.astro` files exist in correct locations
2. Verify imports in page files are correct: `../layouts/Layout.astro`, `../utils/i18n`
3. Run `pnpm build` to see specific error message

### Problem: Translations are placeholder text, not real translations

**This is expected!** The skill generates English placeholders translated via basic patterns. You must:
1. Review each translation key in the JSON files
2. Update with accurate Spanish/Catalan translations
3. Test in browser to verify

## References

- **DEVELOPMENT.md** — Full development guide (includes manual page creation steps)
- **ARCHITECTURE.md** — i18n architecture details
- **NAMING_CONVENTIONS.md** — Naming rules for pages, routes, translation keys
- **astro-config.mjs** — i18n routing configuration

## Future Enhancements

Potential improvements for this skill:

- [ ] Support for nested routes (`/blog/[slug].astro`)
- [ ] Automatic navigation menu update
- [ ] Integration with external translation API
- [ ] Template selection (blank vs. with sections)
- [ ] Batch page creation (create multiple pages at once)

---

## Summary

| Feature | Benefit |
|---------|---------|
| Automates 3 file creation | Eliminates boilerplate |
| Syncs translation keys | Prevents missing translation errors |
| Validates file structure | Catches mistakes early |
| Generates placeholders | Jump-start page development |
| Optional manual steps | Flexibility for complex pages |

**Result**: Add a multiidioma page in 30 seconds instead of 5 minutes.
