import {
  DataConnectionError,
  DataConnectionFilters,
  provideDataClass,
} from 'scrivito'

export const SmkArtwork = provideDataClass('SmkArtwork', {
  title: 'Statens Museum for Kunst - Artwork',
  attributes: {
    creator_date_of_birth: ['date', { title: 'Artist’s date of birth' }],
    creator_date_of_death: ['date', { title: 'Artist’s date of death' }],
    creator: ['string', { title: 'Artist' }],
    label: ['string', { title: 'Description' }],
    production_date: ['date', { title: 'Creation date' }],
    title: ['string', { title: 'Title' }],

    acquisition_date: ['date', { title: 'Acquisition date' }],
    current_location_name: ['string', { title: 'Current location' }],
    frontend_url: ['string', { title: 'URL' }],
    geo_location: ['string', { title: 'Geo location' }],
    has_image: ['boolean', { title: 'Has image?' }],
    image_native: ['string', { title: 'Image URL (high resolution)' }],
    image_thumbnail: ['string', { title: 'Image URL (thumbnail)' }],
    on_display: ['boolean', { title: 'On display?' }],
    public_domain: ['boolean', { title: 'Public domain?' }],
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

      const { filters, ranges } = calculateFiltersAndRanges(params.filters())
      url.searchParams.set('filters', filters.join(','))
      url.searchParams.set('range', ranges.join(','))

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
      const response = (await request.json()) as {
        items: RawArtwork[]
        found: number
      }

      const seen = offset + rows
      const continuation = response.found >= seen ? seen.toString() : null

      return {
        continuation,
        count: response.found,
        results: response.items.map((i) => formatItem(i)),
      }
    },
    async get(id) {
      const url = new URL('https://api.smk.dk/api/v1/art')
      url.searchParams.set('lang', 'en')
      url.searchParams.set('object_number', decodeURIComponent(id))

      const request = await fetch(url)
      if (!request.ok) return null

      const result = await request.json()
      const [firstItem] = result.items
      if (!firstItem) return null
      return formatItem(firstItem)
    },
  },
})

function formatItem(item: RawArtwork) {
  return {
    ...item,
    // Some object numbers contain spaces, therefore we encode it.
    _id: encodeURIComponent(item.object_number),

    creator_date_of_birth: item.production?.[0]?.creator_date_of_birth,
    creator_date_of_death: item.production?.[0]?.creator_date_of_death,
    creator: (item.production || [])
      .map((p) => p?.creator)
      .filter(Boolean)
      .join(', '),
    label: item.labels?.[0]?.text,
    production_date: item.production_date?.[0]?.end,
    title: item.titles?.[0]?.title,
  }
}

function calculateFiltersAndRanges(filtersObj: DataConnectionFilters): {
  filters: string[]
  ranges: string[]
} {
  const filters: string[] = []
  const ranges: string[] = []

  Object.entries(filtersObj).forEach(([filterAttribute, filter]) => {
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
      filters.push(`[${filterAttribute}:${String(value)}]`),
    )

    if (gtes.length > 1) {
      throw new DataConnectionError(
        `Filtering '${filterAttribute}' is not supported for multiple '${gtes[0]?.operator ?? ''}' operators.`,
      )
    }
    const rangeStart = gtes[0]?.value ?? '*'

    if (ltes.length > 1) {
      throw new DataConnectionError(
        `Filtering '${filterAttribute}' is not supported for multiple '${ltes[0]?.operator ?? ''}' operators.`,
      )
    }
    const rangeEnd = ltes[0]?.value ?? '*'

    if (rangeStart !== '*' || rangeEnd !== '*') {
      ranges.push(
        `[${filterAttribute}:{${String(rangeStart)};${String(rangeEnd)}}]`,
      )
    }
  })

  return { filters, ranges }
}

type RawArtwork = {
  acquisition_date_precision: string
  acquisition_date: string
  artist: string[]
  brightness: number
  colors: string[]
  colortemp: number
  contrast: number
  created: string
  current_location_name: string
  enrichment_url: string
  entropy: number
  frontend_url: string
  has_3d_file: boolean
  has_image: boolean
  id: string
  iiif_manifest: string
  image_height: number
  image_hq: boolean
  image_iiif_id: string
  image_iiif_info: string
  image_mime_type: string
  image_native: string
  image_orientation: string
  image_size: number
  image_thumbnail: string
  image_width: number
  labels?: Label[]
  materials: string[]
  media_video: string[]
  modified: string
  number_of_parts: number
  object_names: { name: string }[]
  object_number: string
  object_url: string
  on_display: boolean
  production_date?: { end: string; period: string; start: string }[]
  production_dates_notes: string[]
  production?: Production[]
  public_domain: boolean
  rights: string
  saturation: number
  similar_images_url: string
  suggested_bg_color: string[]
  techniques: string[]
  titles?: { language: string; title: string }[]
}

interface Label {
  date: string
  source: string
  text: string
  type: string
}

interface Production {
  creator_date_of_birth: string
  creator_date_of_death: string
  creator_forename: string
  creator_gender: string
  creator_lref: string
  creator_nationality: string
  creator_surname: string
  creator: string
}
