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

const BLACKLIST_OBJ_CLASSES = ['Image', 'Redirect', 'Video']

export const ContentSearchResult = provideDataClass('ContentSearchResult', {
  attributes: async () => {
    const lang = await load(currentLanguage)

    return {
      title: ['string', { title: lang === 'de' ? 'Titel' : 'Title' }],
      url: ['string', { title: 'URL' }],
      snippet: ['string', { title: lang === 'de' ? 'Schnipsel' : 'Snippet' }],
    }
  },
  title: async () =>
    (await load(currentLanguage)) === 'de'
      ? 'Inhalts-Suchergebnis'
      : 'Content Search Result',
  connection: {
    async index(params) {
      if (Object.keys(params.filters()).length > 0) {
        throw new Error('Filtering is not supported for CMS Search Results.')
      }

      if (params.order().length > 0) {
        throw new Error('Sorting is not supported for CMS Search Results.')
      }

      const search = params.search()
      if (!search) return { results: [], count: 0 }

      const objSearch = Obj.whereFullTextOf('*', 'matches', search)
        .andNot('_objClass', 'equals', BLACKLIST_OBJ_CLASSES)
        .and('_dataParam', 'equals', null) // Ignore data details pages
        .andNot('excludeFromSearch', 'equals', true)

      const count = await load(() => objSearch.count())

      const { offset, newOffset, continuation } = pagination(
        params.continuation(),
        params.limit(),
        count,
      )

      const results = await load(() =>
        objSearch.take(newOffset).slice(offset).map(objToResult),
      )

      return { continuation, count, results }
    },
    async get(id) {
      const obj = await load(() => Obj.get(id))
      return obj ? load(() => objToResult(obj)) : null
    },
  },
})

function pagination(
  inputContinuation: string | undefined,
  inputLimit: number,
  count: number,
) {
  const offset = inputContinuation === undefined ? 0 : Number(inputContinuation)
  const limit = inputLimit || 10
  const newOffset = offset + limit

  const continuation = newOffset < count ? newOffset.toString() : undefined

  return { offset, newOffset, continuation }
}

function objToResult(obj: Obj) {
  return {
    _id: obj.id(),
    title: removePlaceholders(objTitle(obj)),
    url: urlFor(obj),
    snippet: removePlaceholders(
      extractText(obj, { length: 300 }) ||
        ensureString(obj.get('metaDataDescription')),
    ),
    image: obj.get('image'),
  }
}

function removePlaceholders(text: string): string {
  // This is only a "good enough" implementation.
  // It might remove more than just SDK placeholders.
  return text.replace(/__.+?__/gi, '')
}
