import {
  currentLanguage,
  extractText,
  load,
  Obj,
  provideDataClass,
  urlFor,
} from 'scrivito'
import { objTitle } from '../../utils/objTitle'
import { ensureString } from '../../utils/ensureString'
import { isImage } from '../../Objs/Image/ImageObjClass'

const BLACKLIST_OBJ_CLASSES = ['Dropdown', 'Font', 'Image', 'Redirect', 'Video']

export const ContentSearchResult = provideDataClass('ContentSearchResult', {
  attributes: async () => {
    const lang = await load(currentLanguage)

    return {
      image: [
        'reference',
        { title: lang === 'de' ? 'Bild' : 'Image', to: 'Image' },
      ],
      snippet: [
        'string',
        { title: lang === 'de' ? 'Textausschnitt' : 'Snippet' },
      ],
      title: ['string', { title: lang === 'de' ? 'Titel' : 'Title' }],
      url: ['string', { title: 'URL' }],
    }
  },
  title: async () =>
    (await load(currentLanguage)) === 'de'
      ? 'Suchtreffer (Content)'
      : 'Search result (content)',
  connection: {
    async index(params) {
      if (Object.keys(params.filters()).length > 0) {
        throw new Error('Search result (content) does not support filtering.')
      }

      if (params.order().length > 0) {
        throw new Error('Search result (content) does not support sorting.')
      }

      const search = params.search()
      if (!search) return { results: [], count: 0 }

      const objSearch = Obj.whereFullTextOf('*', 'matches', search)
        .andNot('_objClass', 'equals', BLACKLIST_OBJ_CLASSES)
        .and('_dataParam', 'equals', null) // Ignore data details pages. See issue #11592.
        .andNot('excludeFromSearch', 'equals', true)

      const limit = params.limit()

      const { results, count } = await load(() => ({
        results: objSearch
          .take(limit)
          .slice(Number(params.continuation() ?? 0))
          .map(objToResult),
        count: objSearch.count(),
      }))

      const continuation = limit < count ? limit.toString() : undefined

      return { continuation, count, results }
    },
  },
})

function objToResult(obj: Obj) {
  const imageReference = obj.get('image')
  const imageId = isImage(imageReference) ? imageReference.id() : null

  const snippet =
    ensureString(obj.get('metaDataDescription')) ||
    extractText(obj, { length: 300 })

  return {
    _id: obj.id(),
    image: imageId,
    snippet: removePlaceholders(snippet),
    title: removePlaceholders(objTitle(obj)),
    url: urlFor(obj),
  }
}

function removePlaceholders(text: string): string {
  // This is only a "good enough" implementation.
  // It might remove more than just SDK placeholders.
  return text.replace(/__.+?__/gi, '')
}
