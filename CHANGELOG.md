# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## 2026-04-27

### Added

- Footer component with multilingual support (es, ca, en)
- Contact info component displaying phone, email, and address
- New theme color tokens (`--color-gray`, `--color-gray-light`)
- Footer translations for Spanish, Catalan, and English
- Dark logo asset (`scud-logo-dark.svg`) for footer branding
- TypeScript interfaces for i18n structure (`CommonTranslations`, `I18nData`) for type safety

### Fixed

- Navigation component hydration directive error (removed `client:load` from static menu)
- Header logo alt text for better accessibility
- **i18n type safety**: Added proper TypeScript interfaces to eliminate 8 type errors in `i18n.ts`
- **i18n compatibility**: Fixed `getI18n()` return type from `unknown` to `CommonTranslations`
- **ButtonGradient.astro**: Type error resolved via i18n.ts fixes

### Changed

- Global CSS color scheme (renamed `--color-background` to `--color-gray`)
- Body background utility updated to use new theme tokens
- Language switcher styling refactored to Tailwind utilities
- Footer layout with logo, language switcher, contact info, and copyright sections
- i18n structure: unified locale-specific translation files (`es.json`, `en.json`, `ca.json`) into single `common.json` with nested locale structure

### Removed

- Unused i18n functions: `getPageI18n()`, `getBlogI18n()`, `getBlogIndex()` (dead code)
- Empty file: `src/i18n/pages/index.json` (orphaned)
- Stale i18n patterns from documentation (Pattern 3: Page-Specific and Pattern 4: Blog Posts)

### Removed

- Redundant `src/i18n/blog/index.json` (posts now managed through `src/i18n/blog/posts/`)
- Individual locale translation files (`src/i18n/es.json`, `src/i18n/en.json`, `src/i18n/ca.json`) consolidated into `common.json`

---

## 2026-04-24

### Added

- Responsive hamburger menu with animated 3-line to cross transformation
- Custom 876px breakpoint for mobile/desktop navigation layout
- Centralized menu state management utility (`menuManager.ts`)

### Fixed

- Responsive breakpoint configuration (lg: 876px now correctly applied)
- Hamburger button visibility at correct breakpoint
- Menu positioning and animations on mobile

### Changed

- Refactored menu state logic into reusable utility functions
- Simplified component scripts by delegating to menu manager

---

## 2026-04-20

### Added

- Initial Astro 6 project structure with TypeScript
- Multi-language support (es, ca, en) with native Astro i18n
- Comprehensive documentation structure
- Code style and i18n pattern instructions
- Gradient CTA button component
- Project optimization skills for page creation

### Fixed

- TypeScript configuration with @types/node
- Global CSS import in layout
- Button gradient hover effects

### Changed

- Logo import optimization
- Documentation reorganization for AI-agnostic discovery
