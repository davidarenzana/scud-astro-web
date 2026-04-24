# Changelog Management

## When to Update CHANGELOG.md

Update `CHANGELOG.md` automatically when:
1. **Merging a pull request into main** — Add a new dated section with the changes
2. **User requests changelog update** — Update immediately
3. **After pushing commits to main** — Group related changes

## Format Rules

Follow [Keep a Changelog](https://keepachangelog.com/) format:

```markdown
## YYYY-MM-DD

### Added
- Feature description 1
- Feature description 2

### Fixed
- Bug fix description 1

### Changed
- Behavior change 1
```

## Categories to Use

- **Added** — New features, components, utilities
- **Fixed** — Bug fixes, corrections
- **Changed** — Behavior changes, refactoring, improvements
- **Deprecated** — Soon-to-be removed features (rarely used)
- **Removed** — Deleted features (rarely used)
- **Security** — Security fixes (if applicable)

## Steps When Merging a PR

1. **Read the PR title and description** to understand what changed
2. **Review the diff** to see what files changed
3. **Create or update a date section** in CHANGELOG.md:
   - If today's date section exists, add to it
   - If not, create new section with today's date (YYYY-MM-DD)
4. **Add 3-5 concise bullet points** under appropriate categories
   - Use past tense, imperative style: "Add X", "Fix Y", "Refactor Z"
   - Be specific: `Add hamburger menu component` not `Add menu stuff`
5. **Commit the CHANGELOG update** with message: `docs(changelog): update for [feature name]`

## Example PR Merge Workflow

**PR Title**: "Add responsive header with hamburger menu"

**Changes detected**:
- New files: `HamburgerButton.astro`, `NavigationMenu.astro`, `menuManager.ts`
- Modified: `tailwind.config.ts`, `Header.astro`

**CHANGELOG update**:
```markdown
## 2026-04-24

### Added
- Responsive hamburger menu with animated 3-line to cross transformation
- Custom 876px breakpoint for mobile/desktop navigation

### Fixed
- Hamburger button visibility at breakpoint

### Changed
- Refactored menu state logic into reusable utilities
```

## Important Notes

- **Don't include** commit hashes or technical implementation details
- **Focus on** what the user sees/experiences
- **Keep it concise** — 1 line per feature/fix
- **Group by date** — Multiple PRs on same day go in same section
- **Use `---`** to visually separate date sections for readability
