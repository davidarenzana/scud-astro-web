# Skills Index

This directory contains automation skills that extend Copilot capabilities for scud-astro-web.

## 📋 Available Skills

### 1. scud-astro-add-page

**Purpose**: Automate creation of new multilingual pages (Spanish, Catalan, English)

**Invoke with**:
```
"Add a new page called 'Contact' in Spanish, Catalan, and English"
```

**What it does**:
- ✅ Creates 3 `.astro` files (es, ca, en) with Layout template
- ✅ Generates translation keys in all 3 JSON files
- ✅ Validates file structure and key synchronization
- ✅ Prevents i18n desynchronization errors

**Time saved**: 5 min manual → 30 seconds automated

**Location**: [./scud-astro-add-page/SKILL.md](./scud-astro-add-page/SKILL.md)

---

## 🎯 When to Use Skills

| Task | Skill | Time Saved |
|------|-------|-----------|
| Add new page (multiidioma) | scud-astro-add-page | 5 min → 30 sec |
| Add page section | Manual (not yet automated) | - |
| Update styling | Manual (not yet automated) | - |
| Add component | Manual (not yet automated) | - |

---

## 🚀 How to Request a Skill

If you find a repetitive task that could be automated:

1. Describe the workflow
2. Provide example scenarios
3. Suggest skill name

Example:
```
"Create a skill for refactoring component names 
across the project (batch rename with i18n updates)"
```

---

## 📚 Skill Documentation

Each skill has a `SKILL.md` file with:
- **Purpose**: What the skill does
- **When to use**: When to invoke it
- **Workflow**: Step-by-step execution
- **Examples**: Real usage examples
- **Limitations**: What it doesn't do
- **Troubleshooting**: Common issues

---

## 🔗 Related Documentation

- [AGENTS.md](../../AGENTS.md) — Quick reference for AI agents
- [DEVELOPMENT.md](../../DEVELOPMENT.md) — Full development guide
- [.copilot-context/](../../.copilot-context/) — Specialized context

---

## 💡 Future Skills (Ideas)

- [ ] `refactor-component` — Rename component + update imports + i18n
- [ ] `add-translation-batch` — Add key to all 3 JSON files simultaneously
- [ ] `migrate-styling` — Convert inline styles to Tailwind classes
- [ ] `component-scaffold` — Generate component with props, types, and stubs

---

**Tip**: Skills are best for repetitive, well-defined workflows. If you find yourself doing the same thing 3+ times, it's a good candidate for a skill! 🎯
