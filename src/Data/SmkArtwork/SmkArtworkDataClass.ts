import {
  DataConnectionError,
  DataConnectionFilters,
  provideDataClass,
} from 'scrivito'
import { ensureArray } from '../../utils/ensureArray'
import { ensureObject } from '../../utils/ensureObject'
import { ensureString } from '../../utils/ensureString'

export const SmkArtwork = provideDataClass('SmkArtwork', {
  title: 'Statens Museum for Kunst - Artwork',
  attributes: {
    acquisition_date: ['date', { title: 'Acquisition date' }],
    creator_date_of_birth: ['date', { title: 'Artist’s date of birth' }],
    creator_date_of_death: ['date', { title: 'Artist’s date of death' }],
    creator: ['string', { title: 'Artist' }],
    current_location_name: ['string', { title: 'Current location' }],
    frontend_url: ['string', { title: 'URL' }],
    geo_location: ['string', { title: 'Geo location' }],
    has_image: ['boolean', { title: 'Has image?' }],
    image_native: ['string', { title: 'Image URL (high resolution)' }],
    image_thumbnail: ['string', { title: 'Image URL (thumbnail)' }],
    label: ['string', { title: 'Label' }],
    on_display: ['boolean', { title: 'On display?' }],
    production_date: ['date', { title: 'Creation date' }],
    public_domain: ['boolean', { title: 'Public domain?' }],
    title: ['string', { title: 'Title' }],
  },
  connection: {
    async index(params) {
      // See https://www.smk.dk/en/article/smk-api/ for documentation
      const url = new URL('https://api.smk.dk/api/v1/art/search')
      url.searchParams.set('keys', params.search() || '*')
      url.searchParams.set('lang', 'en')

      const offset = Number(params.continuation()) || 0
      url.searchParams.set('offset', offset.toString())

      const rows = Math.min(params.limit(), 2000)
      url.searchParams.set('rows', rows.toString())

      const { filters, range } = calculateFiltersAndRangeParams(
        params.filters(),
      )
      url.searchParams.set('filters', filters)
      url.searchParams.set('range', range)

      const [firstOrder, ...otherOrders] = params.order()
      if (firstOrder) {
        if (otherOrders.length > 0) {
          throw new DataConnectionError('Multiple orderings are not supported')
        }
        const [attribute, direction] = firstOrder
        url.searchParams.set('sort', attribute)
        url.searchParams.set('sort_type', direction)
      }

      const request = await fetch(url)
      if (!request.ok) {
        const errorText = await request.text()
        throw new DataConnectionError(errorText)
      }

      const jsonResponse: unknown = await request.json()
      const responseObj = ensureObject(jsonResponse)
      const response = {
        items: ensureArray(responseObj.items),
        found: typeof responseObj.found === 'number' ? responseObj.found : 0,
      }

      const seen = offset + rows
      const continuation = response.found >= seen ? seen.toString() : null

      return {
        continuation,
        count: response.found,
        results: response.items.map((i) => formatItem(ensureObject(i))),
      }
    },
    async get(id) {
      const url = new URL('https://api.smk.dk/api/v1/art')
      url.searchParams.set('lang', 'en')
      url.searchParams.set('object_number', decodeURIComponent(id))

      const request = await fetch(url)
      if (!request.ok) return null

      const result = await request.json()
      const resultObj = ensureObject(result)
      const items = ensureArray(resultObj.items)
      const [firstItem] = items
      if (!firstItem) return null
      return formatItem(ensureObject(firstItem))
    },
  },
})

function formatItem(item: Record<string, unknown>) {
  const production = ensureArray(item.production)
  const labels = ensureArray(item.labels)
  const productionDate = ensureArray(item.production_date)
  const titles = ensureArray(item.titles)

  const firstProduction = ensureObject(production[0])
  const firstLabel = ensureObject(labels[0])
  const firstProductionDate = ensureObject(productionDate[0])
  const firstTitle = ensureObject(titles[0])

  return {
    ...item,
    // Some object numbers contain spaces, therefore we encode it.
    _id: encodeURIComponent(ensureString(item.object_number)),

    creator_date_of_birth: ensureString(firstProduction.creator_date_of_birth),
    creator_date_of_death: ensureString(firstProduction.creator_date_of_death),
    creator: production
      .map((p) => ensureString(ensureObject(p).creator))
      .filter(Boolean)
      .join(', '),
    label: ensureString(firstLabel.text),
    production_date: ensureString(firstProductionDate.end),
    title: ensureString(firstTitle.title),
  }
}

function calculateFiltersAndRangeParams(filtersObj: DataConnectionFilters): {
  filters: string
  range: string
} {
  const { filters, ranges } = Object.entries(filtersObj).reduce<{
    filters: string[]
    ranges: string[]
  }>(
    (acc, [filterAttribute, filter]) => {
      const subFilters = filter.operator === 'and' ? filter.value : [filter]

      const { eqs, gtes, ltes, others } = subFilters.reduce<{
        eqs: typeof subFilters
        gtes: typeof subFilters
        ltes: typeof subFilters
        others: typeof subFilters
      }>(
        (acc, filter) => {
          if (filter.opCode === 'eq') acc.eqs.push(filter)
          else if (filter.opCode === 'gte') acc.gtes.push(filter)
          else if (filter.opCode === 'lte') acc.ltes.push(filter)
          else acc.others.push(filter)

          return acc
        },
        { eqs: [], gtes: [], ltes: [], others: [] },
      )

      if (others.length > 0) {
        throw new DataConnectionError(
          `Filtering '${filterAttribute}' is not supported for operator '${others.map(({ operator }) => operator).join(', ')}'`,
        )
      }

      eqs.forEach(({ value }) =>
        acc.filters.push(`[${filterAttribute}:${String(value)}]`),
      )

      if (gtes.length > 1) {
        throw new DataConnectionError(
          `Filtering '${filterAttribute}' is not supported for multiple 'isGreaterThanOrEquals' operators.`,
        )
      }
      const rangeStart = gtes[0]?.value ?? '*'

      if (ltes.length > 1) {
        throw new DataConnectionError(
          `Filtering '${filterAttribute}' is not supported for multiple 'isLessThanOrEquals' operators.`,
        )
      }
      const rangeEnd = ltes[0]?.value ?? '*'

      if (rangeStart !== '*' || rangeEnd !== '*') {
        acc.ranges.push(
          `[${filterAttribute}:{${String(rangeStart)};${String(rangeEnd)}}]`,
        )
      }

      return acc
    },
    { filters: [], ranges: [] },
  )

  return { filters: filters.join(','), range: ranges.join(',') }
}
