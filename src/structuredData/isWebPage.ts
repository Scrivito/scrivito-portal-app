// Based on https://schema.org/version/30.1/schemaorg-all-https.jsonld:
// "WebPage" and all of its direct and indirect subtypes.
const WEB_PAGE_TYPES = new Set([
  'AboutPage',
  'CheckoutPage',
  'CollectionPage',
  'ContactPage',
  'FAQPage',
  'ImageGallery',
  'ItemPage',
  'MediaGallery',
  'MedicalWebPage',
  'ProfilePage',
  'QAPage',
  'RealEstateListing',
  'SearchResultsPage',
  'VideoGallery',
  'WebPage',
])

// Accepts a JSON-LD "@type" value: a single type or an array of types.
export function isWebPage(type: unknown): boolean {
  return [type]
    .flat()
    .some((name) => typeof name === 'string' && WEB_PAGE_TYPES.has(name))
}
