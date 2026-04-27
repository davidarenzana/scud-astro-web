import type { AstroGlobal } from 'astro'
import i18nData from '../i18n/common.json'

const translations = i18nData as Record<string, unknown>

export type Locale = keyof typeof translations

export type PageContent = Record<Locale, Record<string, unknown>>
export type BlogPost = Record<Locale, Record<string, unknown>>

// Cache para evitar importaciones múltiples
const pageCache = new Map<string, PageContent>()
const blogCache = new Map<string, BlogPost>()

export function getI18n(locale: Locale) {
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

/**
 * Carga contenido específico de una página + común
 * Merge automático: común (nav, footer) + específico (page content)
 *
 * @example
 * const i18n = getPageI18n('services', 'es');
 * console.log(i18n.title); // De pages/services.json
 * console.log(i18n.nav); // Del común es.json
 */
export async function getPageI18n(page: string, locale: Locale): Promise<Record<string, unknown>> {
  try {
    const cacheKey = `page:${page}:${locale}`

    // Retornar de cache si existe
    if (pageCache.has(cacheKey)) {
      const cached = pageCache.get(cacheKey)!
      return { ...translations[locale], ...cached[locale] }
    }

    // Importar dinámicamente el archivo específico
    const pageContent = (await import(`../i18n/pages/${page}.json`)) as PageContent

    pageCache.set(`page:${page}`, pageContent)

    // Merge: común + específico
    return {
      ...translations[locale],
      ...pageContent[locale],
    }
  } catch (error) {
    console.warn(`No page content found for "${page}". Using common i18n.`)
    return translations[locale]
  }
}

/**
 * Carga contenido de un post del blog + común
 *
 * @example
 * const post = getBlogI18n('post-1', 'es');
 * console.log(post.title); // Del post
 * console.log(post.nav); // Del común es.json
 */
export async function getBlogI18n(slug: string, locale: Locale): Promise<Record<string, unknown>> {
  try {
    const cacheKey = `blog:${slug}:${locale}`

    if (blogCache.has(cacheKey)) {
      const cached = blogCache.get(cacheKey)!
      return { ...translations[locale], ...cached[locale] }
    }

    const postContent = (await import(`../i18n/blog/posts/${slug}.json`)) as BlogPost

    blogCache.set(`blog:${slug}`, postContent)

    return {
      ...translations[locale],
      ...postContent[locale],
    }
  } catch (error) {
    console.warn(`No blog post found for "${slug}". Using common i18n.`)
    return translations[locale]
  }
}

/**
 * Carga listado de posts del blog (índice)
 */
export async function getBlogIndex(locale: Locale): Promise<Array<Record<string, unknown>>> {
  try {
    const blogIndex = (await import('../i18n/blog/index.json')) as Record<
      Locale,
      Array<Record<string, unknown>>
    >
    return blogIndex[locale] || []
  } catch (error) {
    console.warn('No blog index found. Returning empty array.')
    return []
  }
}
