# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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
