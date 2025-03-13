import { Obj, urlFor, extractText } from 'scrivito'
import { truncate } from 'lodash-es'
import { ensureString } from './ensureString'
import { isImage } from '../Objs/Image/ImageObjClass'
import { isDropdown } from '../Objs/Dropdown/DropdownObjClass'

export function getMetadata(page: Obj) {
  if (isDropdown(page)) return [{ name: 'robots', content: 'noindex' }]

  const meta = [
    { name: 'twitter:card', content: 'summary_large_image' },
    { property: 'og:type', content: 'article' },
    { property: 'og:url', content: urlFor(page) },
  ]
  const extractedText = extractText(page, { length: 330 })

  if (!page.get('robotsIndex')) {
    meta.push({ name: 'robots', content: 'noindex' })
  }

  const description = ensureString(page.get('description'))
  if (description) {
    meta.push({ name: 'description', content: description })
  }

  const root = Obj.root()
  if (root) {
    const siteFacebookAppId = ensureString(root.get('siteFacebookAppId'))
    if (siteFacebookAppId) {
      meta.push({ property: 'fb:app_id', content: siteFacebookAppId })
    }

    const siteTwitterSite = ensureString(root.get('siteTwitterSite'))
    if (siteTwitterSite) {
      meta.push({ name: 'twitter:site', content: siteTwitterSite })
    }
  }

  const tcCreator = ensureString(page.get('tcCreator'))
  if (tcCreator) {
    meta.push({ name: 'twitter:creator', content: tcCreator })
  }

  const tcDescription = ensureString(
    page.get('tcDescription') ||
      truncate(extractedText, { length: 137, separator: /,? +/ }),
  )
  if (tcDescription) {
    meta.push({ name: 'twitter:description', content: tcDescription })
  }

  const tcImage = imageUrlFor(page.get('tcImage'))

  if (tcImage) meta.push({ name: 'twitter:image', content: tcImage })

  const tcTitle = ensureString(page.get('tcTitle') || page.get('title'))
  if (tcTitle) meta.push({ name: 'twitter:title', content: tcTitle })

  const ogDescription = ensureString(
    page.get('ogDescription') ||
      truncate(extractedText, { length: 297, separator: /,? +/ }),
  )
  if (ogDescription) {
    meta.push({ property: 'og:description', content: ogDescription })
  }

  const ogImage = imageUrlFor(page.get('ogImage'))

  if (ogImage) meta.push({ property: 'og:image', content: ogImage })

  const ogTitle = ensureString(page.get('ogTitle') || page.get('title'))
  if (ogTitle) meta.push({ property: 'og:title', content: ogTitle })

  return meta
}

function imageUrlFor(obj: unknown) {
  if (isImage(obj) && obj.get('blob')) return obj.contentUrl()
}
