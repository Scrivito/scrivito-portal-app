import * as Scrivito from 'scrivito'
import jsontoxml from 'jsontoxml'
import { storeResult } from './storeResult'
import { getSiteIds } from './getSiteIds'

export async function prerenderSitemap(
  targetDir: string,
  objClassesWhitelist: string[],
): Promise<void> {
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

function pageToSitemapUrl(page: Scrivito.Obj) {
  return {
    url: {
      loc: Scrivito.urlFor(page),
      lastmod: formatDate(page.lastChanged()),
    },
  }
}

function formatDate(date: Date | null) {
  return date?.toISOString().split('T')[0]
}

type SitemapUrl = {
  url: {
    loc: string
    lastmod?: string
  }
}

function sitemapUrlsToSitemapXml(sitemapUrls: SitemapUrl[]) {
  return jsontoxml(
    [
      {
        name: 'urlset',
        attrs: { xmlns: 'http://www.sitemaps.org/schemas/sitemap/0.9' },
        children: sitemapUrls,
      },
    ],
    { xmlHeader: true },
  )
}
