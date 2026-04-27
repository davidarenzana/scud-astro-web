import type { AstroGlobal } from 'astro'
import i18nData from '../i18n/common.json'

// Type definitions for i18n structure
interface CommonTranslations {
  nav: Record<string, string>
  cta: Record<string, string>
  language: Record<string, string>
  routes: Record<string, string>
  footer: Record<string, string>
}

interface I18nData {
  es: CommonTranslations
  en: CommonTranslations
  ca: CommonTranslations
}

const translations = i18nData as I18nData

export type Locale = keyof I18nData

export function getI18n(locale: Locale): CommonTranslations {
  return translations[locale] || translations.es
}

export function getLocaleFromPath(pathname: string): Locale {
  const match = pathname.match(/^\/([a-z]{2})/)
  const locale = match ? match[1] : 'es'
  return locale as Locale
}

export function getCurrentLocale(astro: AstroGlobal): Locale {
  const locale = getLocaleFromPath(astro.url.pathname)
  return locale
}
