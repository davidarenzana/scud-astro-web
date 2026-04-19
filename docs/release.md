# Release & Versioning

Automatic version bumping + changelog generation on every merge to main.

---

## 🤖 How It Works

### Automatic Workflow (Primary)

```
1. Create feature branch (e.g., feat/my-feature)
   ↓
2. Make commits with Conventional Commits format
   ↓
3. Create PR and merge to main
   ↓
4. GitHub Actions triggers automatically (.github/workflows/bump-version.yml)
   ↓
5. Script runs: scripts/bump-version.js
   - Increments patch version (0.0.1 → 0.0.2)
   - Generates CHANGELOG.md entry from commits
   - Auto-commits: "chore(release): bump to v0.0.2"
   - Pushes to main
   ↓
6. Result: version bumped + changelog updated ✨
```

**Zero configuration needed** — just merge PRs to main!

### Manual Workflow (Fallback)

If you need to version on a non-main branch (rare):

```bash
pnpm bump-version
```

Does the same as automatic but local-only (doesn't push).

---

## 📝 Version Incrementing Rules

Currently using **patch-only versioning** (simplest approach):

| Change            | Version  | Example       |
| ----------------- | -------- | ------------- |
| Any merge to main | Patch +1 | 0.0.1 → 0.0.2 |

**Future**: Can switch to semantic versioning (major.minor.patch based on commit type):

- `feat:` → minor version
- `fix:` → patch version
- `BREAKING CHANGE:` → major version

(See `scripts/bump-version.js` for implementation details.)

---

## 📖 CHANGELOG.md Format

Format: [Keep a Changelog](https://keepachangelog.com/en/1.0.0/)

```markdown
## [0.0.2] - 2026-04-19

### Changed

- feat(component): add new widget (abc1234)
- fix(i18n): handle missing locale (def5678)

## [0.0.1] - 2026-04-15

### Added

- Initial project setup
```

**Structure**:

- `[VERSION]` — Exact version number
- `YYYY-MM-DD` — Release date (auto-generated)
- `Changed/Added/Fixed/...` — Commit categories
- `(HASH)` — Git commit hash for reference

---

## 🔍 Files Involved

| File                                 | Purpose                                   |
| ------------------------------------ | ----------------------------------------- |
| `package.json`                       | Version number (bumped automatically)     |
| `CHANGELOG.md`                       | Release history (updated automatically)   |
| `scripts/bump-version.js`            | Versioning script (runs locally or in CI) |
| `.github/workflows/bump-version.yml` | GitHub Actions automation                 |

---

## ✅ Verification

### After Merge to Main

1. Check workflow ran:

   ```bash
   # GitHub Actions tab → bump-version workflow
   # Should show: ✓ success
   ```

2. Verify version bumped:

   ```bash
   cat package.json | grep version
   # Output: "version": "0.0.2"
   ```

3. Verify changelog updated:

   ```bash
   head -20 CHANGELOG.md
   # Should show new version entry with today's date
   ```

4. Check commits:
   ```bash
   git log --oneline -1
   # Output: chore(release): bump to v0.0.2
   ```

---

## 🚀 Usage Patterns

### Pattern 1: Single Merge → Automatic Release

```bash
# User creates feature branch and PR
git checkout -b feat/new-page
# ... make changes, commit ...
git push origin feat/new-page
# → Create PR, merge

# AUTOMATIC: GitHub Actions runs immediately
# Result: version 0.0.1 → 0.0.2, CHANGELOG.md updated
```

### Pattern 2: Multiple Merges Same Day

```bash
# Merge PR #1 at 10:00
# → GitHub Actions: v0.0.1 → v0.0.2

# Merge PR #2 at 10:30
# → GitHub Actions: v0.0.2 → v0.0.3

# Merge PR #3 at 11:00
# → GitHub Actions: v0.0.3 → v0.0.4

# Result: CHANGELOG.md shows 3 new entries
```

### Pattern 3: Manual Bump (Non-Main Branch)

```bash
git checkout feat/experimental
pnpm bump-version
# Result: Local files updated (package.json, CHANGELOG.md)
# But NOT pushed to remote (manual merge needed)
```

---

## ⚙️ Configuration

### bump-version.js

Located: `scripts/bump-version.js`

Key logic:

- Reads `package.json` version
- Splits into [major, minor, patch]
- Increments: `patch += 1`
- Generates CHANGELOG entry from git commits
- Updates both files
- Commits and pushes (if on CI)

To modify versioning strategy (e.g., semantic versioning):

- Edit logic at line: `const newVersion = ...`

### GitHub Actions Workflow

Located: `.github/workflows/bump-version.yml`

Triggers: `on: push: branches: [main]`

To disable: Delete `.github/workflows/bump-version.yml` or comment out trigger

To run on different branch: Change `branches: [main]` to `branches: [develop]` etc.

---

## 🔗 Related Documentation

- **Commands**: See `commands.md` → Release & Versioning section
- **Git Workflow**: See `development-workflow.md`
- **Version History**: See `../../CHANGELOG.md`

---

## 💡 Best Practices

1. **Use Conventional Commits** — Ensures readable CHANGELOG

   ```bash
   ✅ git commit -m "feat(component): add new widget"
   ❌ git commit -m "update stuff"
   ```

2. **Small, frequent merges** — Easier to track what changed

   ```bash
   ✅ Multiple PRs: v0.0.1 → v0.0.2 → v0.0.3
   ❌ Single huge PR: v0.0.1 → v0.0.5
   ```

3. **Keep CHANGELOG.md in git** — It's your release history

   ```bash
   # Never delete or force-push CHANGELOG.md
   git push --force # ❌ BAD
   ```

4. **Tag releases (optional)** — For marking stable versions
   ```bash
   git tag v0.0.2
   git push origin v0.0.2
   ```

---

## ❓ FAQ

**Q: Can I skip automatic versioning for a specific commit?**  
A: No, currently all merges to main trigger versioning. Workaround: Merge to develop first, then to main.

**Q: What if I want semantic versioning (major.minor.patch)?**  
A: Edit `scripts/bump-version.js` to parse commit types (feat → minor, fix → patch, etc).

**Q: Can I manually edit CHANGELOG.md?**  
A: Yes, but next automatic release will prepend a new entry (your edits stay below).

**Q: What if GitHub Actions fails?**  
A: Check `.github/workflows/bump-version.yml` logs. Most common: git config not set. Manually run `pnpm bump-version` locally.

**Q: How far back does commit history go?**  
A: Script uses `git log` from last tag (or beginning if no tags). Approximately 20 latest commits if no tags exist.
