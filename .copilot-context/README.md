# .copilot-context — Specialized Context for AI Agents

This directory contains domain-specific context files optimized for AI agents (GitHub Copilot, etc.). Use these files to understand project decisions, conventions, and workflows.

## 📋 Files Index

| File                                           | Purpose                                | When to Reference                                               |
| ---------------------------------------------- | -------------------------------------- | --------------------------------------------------------------- |
| **[architecture.md](./architecture.md)**       | Technical decisions & design rationale | Working on core features, understanding trade-offs, refactoring |
| **[code-style.md](./code-style.md)**           | Code conventions & formatting rules    | Writing new components, functions, utilities                    |
| **[i18n-patterns.md](./i18n-patterns.md)**     | Multilingual workflow patterns         | Adding pages, components, translations                          |
| **[commands.md](./commands.md)**               | Development commands & scripts         | Running dev server, building, debugging                         |
| **[troubleshooting.md](./troubleshooting.md)** | Common issues & solutions              | Encountering build errors, type errors, i18n issues             |
| **[release.md](./release.md)**                 | Release & versioning workflow          | Creating releases, versioning, changelog management             |
| **[DEVELOPMENT.md](../DEVELOPMENT.md)**        | Full development guide                 | Complete setup, workflows, step-by-step instructions            |

## 🎯 How Copilot Uses This Context

1. **Global rules**: Read from `.copilot-instructions` (root level)
2. **Project overview**: Read from `AGENTS.md` (root level)
3. **Specialized context**: Read from files in this directory based on current task
4. **Full reference**: Refer to root-level docs (ARCHITECTURE.md, DEVELOPMENT.md, etc.)

## 🔍 Quick Lookup

**Q: How do I add a new page?**  
→ See [i18n-patterns.md](./i18n-patterns.md) + [../DEVELOPMENT.md](../DEVELOPMENT.md#adding-a-new-page-multiidioma)

**Q: What naming conventions should I follow?**  
→ See [code-style.md](./code-style.md) + [../NAMING_CONVENTIONS.md](../NAMING_CONVENTIONS.md)

**Q: How do I start the dev server?**  
→ See [commands.md](./commands.md)

**Q: Build is failing, what do I do?**  
→ See [troubleshooting.md](./troubleshooting.md) + [../DEVELOPMENT.md#troubleshooting](../DEVELOPMENT.md#troubleshooting)

**Q: How does versioning and changelog work?**  
→ See [release.md](./release.md) + [../CHANGELOG.md](../CHANGELOG.md)

**Q: Why is the project structured this way?**  
→ See [architecture.md](./architecture.md) + [../ARCHITECTURE.md](../ARCHITECTURE.md)

## 📚 Related Documentation

- Root-level quick reference: [AGENTS.md](../AGENTS.md)
- Global Copilot rules: [.copilot-instructions](../.copilot-instructions)
- Full development guide: [DEVELOPMENT.md](../DEVELOPMENT.md)
- Technical architecture: [ARCHITECTURE.md](../ARCHITECTURE.md)
- Code standards: [NAMING_CONVENTIONS.md](../NAMING_CONVENTIONS.md)
- Automation skills: [.agents/README.md](../.agents/README.md)
- Version history: [CHANGELOG.md](../CHANGELOG.md)

---

**Tip**: These files are optimized for quick reference. Use them in combination with root-level documentation for complete context.
