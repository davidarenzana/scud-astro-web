## [Unreleased]

### Added
- update Home page to display title instead of Header (footer): add LanguageSwitcher component to Footer refactor(header): remove LanguageSwitcher from Header refactor(index) (d016f2f)
- define color theme and gradients (styles) (ac28317)
- update translation strings (i18n) (84268ad)
- add scud branding images (assets) (2619c7b)
- add Lato font with Fontsource provider (fonts) (59f2e59)
- restructure layout with proper centering and max-widths (layout) (06f0023)
- sticky header with proper layout structure (header) (9b221db)
- add CTA translations for demo request (i18n) (a392429)
- add scud-astro-add-page skill for automating multiidioma page creation (skill) (35e5d4a)
- add gradient cta button and optimize logo import (header) (d476e5e)
- implement responsive hamburger menu (header) (50a0918)

### Fixed
- add ignoreDeprecations to suppress baseUrl deprecation warning (config) (a1e13a1)
- import global.css to enable tailwind styles (layout) (039da51)
- add @types/node and configure TypeScript node types (config) (e2efab0)
- fix button gradient hover effect (components) (bdb67b8)
- fix responsive breakpoint configuration at 876px (header) (eecceb6)

### Documentation
- add comprehensive development guide (dev) (1d2fff4)
- add code naming standards guide (conventions) (0afc5d5)
- reorganize documentation into .copilot-context/ for better AI context management (structure) (3a609b4)
- add versioning & changelog to project context (context) (80cda58)
- reorganize context for AI-agnostic discovery (4e92a19)

# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).


- Initial project setup with Astro 6 and Tailwind CSS
- Multi-language support (es, ca, en) with native Astro i18n
- Comprehensive documentation structure
- Semantic commit conventions
