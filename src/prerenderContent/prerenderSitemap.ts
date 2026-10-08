import * as Scrivito from 'scrivito'
import jsontoxml from 'jsontoxml'
import { storeResult } from './storeResult'
import { getSiteIds } from './getSiteIds'
import { hreflangAlternates } from '../utils/hreflangAlternates'

export async function prerenderSitemap(
  targetDir: string,
  objClassesWhitelist: string[],
): Promise<void> {
  if (process.env.PRERENDER_OBJ_ID) return

  console.time('[prerenderSitemap]')

  const pages = await Scrivito.load(() =>
    prerenderSitemapSearch(objClassesWhitelist).take(),
  )
  const sitemapUrls = await Scrivito.load(() => pages.map(pageToSitemapUrl))
  const content = sitemapUrlsToSitemapXml(sitemapUrls)

  storeResult(targetDir, { filename: '/sitemap.xml', content })

  console.log(
    `  📦 [prerenderSitemap] Added sitemap.xml with ${sitemapUrls.length} items to ${targetDir}.`,
  )

  console.timeEnd('[prerenderSitemap]')
}

function prerenderSitemapSearch(objClassesWhitelist: string[]) {
  return Scrivito.Obj.onAllSites()
    .where('_objClass', 'equals', objClassesWhitelist)
    .and('robotsIndex', 'equals', true)
    .and('_siteId', 'equals', getSiteIds())
}

function pageToSitemapUrl(page: Scrivito.Obj): SitemapUrl {
  const lastmod = formatDate(page.lastChanged())

  return {
    name: 'url',
    children: [
      { name: 'loc', text: Scrivito.urlFor(page) },
      ...(lastmod ? [{ name: 'lastmod', text: lastmod }] : []),
      ...hreflangAlternates(page).map(({ hreflang, href }) => ({
        name: 'xhtml:link',
        attrs: { rel: 'alternate', hreflang, href },
      })),
    ],
  }
}

function formatDate(date: Date | null) {
  return date?.toISOString().split('T')[0]
}

type SitemapUrl = {
  name: 'url'
  children: {
    name: string
    text?: string
    attrs?: Record<string, string>
  }[]
}

function sitemapUrlsToSitemapXml(sitemapUrls: SitemapUrl[]) {
  return jsontoxml(
    [
      {
        name: 'urlset',
        attrs: {
          xmlns: 'http://www.sitemaps.org/schemas/sitemap/0.9',
          'xmlns:xhtml': 'http://www.w3.org/1999/xhtml',
        },
        children: sitemapUrls,
      },
    ],
    { xmlHeader: true },
  )
}
