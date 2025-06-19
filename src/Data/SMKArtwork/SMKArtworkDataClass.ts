import { DataConnectionError, provideDataClass } from 'scrivito'

export const SMKArtwork = provideDataClass('SMKArtwork', {
  title: 'Statens Museum for Kunst - Artwork',
  attributes: {
    creator_date_of_birth: ['date', { title: "Artist's birth date" }],
    creator_date_of_death: ['date', { title: "Artist's death date" }],
    creator: ['string', { title: 'Artist' }],
    label: ['string', { title: 'Description' }],
    // production_dates_start: ['date', { title: 'Production start (date)' }],
    production_dates_end: ['date', { title: 'Creation date' }],
    titles: ['string', { title: 'Title' }],

    acquisition_date: ['date', { title: 'Acquisition date' }],
    current_location_name: ['string', { title: 'Location' }],
    frontend_url: ['string', { title: 'URL' }],
    geo_location: ['string', { title: 'Geo location' }],
    has_image: ['boolean', { title: 'Has image?' }],
    image_native: ['string', { title: 'Image URL (High resolution)' }],
    image_thumbnail: ['string', { title: 'Image URL (Thumbnail)' }],
    on_display: ['boolean', { title: 'On display?' }],
    public_domain: ['boolean', { title: 'Public domain?' }],

    //// Leave out number for a shorter list
    // brightness: 'number',
    // colortemp: 'number',
    // contrast: 'number',
    // entropy: 'number',
    // saturation: 'number',

    // // Excluded for a shorter list
    // acquisition_date_precision: 'string',
    // created: 'date',
    // enrichment_url: 'string',
    // has_3d_file: 'boolean',
    // iiif_manifest: 'string',
    // image_height: 'number',
    // image_hq: 'boolean',
    // image_iiif_id: 'string',
    // image_iiif_info: 'string',
    // image_mime_type: 'string',
    // image_orientation: 'string',
    // image_size: 'number',
    // image_width: 'number',
    // modified: ['date', { title: 'Modified (date)' }],
    // object_number: 'string',
    // object_url: 'string',
    // similar_images_url: 'string',
    // rights: 'string',
  },
  connection: {
    async index(params) {
      const offset = Number(params.continuation()) || 0
      const limit = params.limit()
      const rows = Math.min(limit, 20)

      const filters: string[] = []
      const ranges: string[] = []
      Object.entries(params.filters()).forEach(([filterAttribute, filter]) => {
        const subFilters = filter.operator === 'and' ? filter.value : [filter]

        const { eqs, gtes, ltes, others } = subFilters.reduce(
          (acc, filter) => {
            if (filter.opCode === 'eq') acc.eqs.push(filter)
            else if (filter.opCode === 'gte') acc.gtes.push(filter)
            else if (filter.opCode === 'lte') acc.ltes.push(filter)
            else acc.others.push(filter)

            return acc
          },
          { eqs: [], gtes: [], ltes: [], others: [] } as {
            eqs: typeof subFilters
            gtes: typeof subFilters
            ltes: typeof subFilters
            others: typeof subFilters
          },
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

      const url = new URL('https://api.smk.dk/api/v1/art/search')
      url.searchParams.set('lang', 'en')
      url.searchParams.set('keys', params.search() || '*')
      url.searchParams.set('filters', filters.join(','))
      url.searchParams.set('range', ranges.join(','))

      url.searchParams.set('rows', String(rows))
      url.searchParams.set('offset', String(offset))

      const order = params.order()
      if (order && order.length > 0) {
        if (order.length > 1) {
          throw new DataConnectionError('Multiple orderings are not supported')
        }
        const [attribute, direction] = order[0]!
        url.searchParams.set('sort', attribute)
        url.searchParams.set('sort_type', direction)
      }

      const request = await fetch(url)
      if (!request.ok) {
        const errorText = await request.text()
        throw new DataConnectionError(errorText)
      }
      const response = (await request.json()) as {
        items: RawArtObject[]
        found: number
      }

      const seen = offset + rows
      const continuation = response.found >= seen ? String(seen) : null

      return {
        results: response.items.map((i) => formatItem(i)),
        continuation,
        count: response.found,
      }
    },
    async get(id) {
      const url = new URL('https://api.smk.dk/api/v1/art')
      url.searchParams.set('object_number', decodeURIComponent(id))
      url.searchParams.set('lang', 'en')
      const request = await fetch(url)
      if (!request.ok) return null

      const result = await request.json()
      const items = result.items
      if (items.length < 1) return null
      return formatItem(items[0])
    },
  },
})

function formatItem(item: RawArtObject) {
  return {
    ...item,
    _id: encodeURIComponent(item.object_number),

    creator_date_of_birth: (item.production || [])[0]?.creator_date_of_birth,
    creator_date_of_death: (item.production || [])[0]?.creator_date_of_death,
    creator: (item.production || []).map((p) => p.creator).join(', '),
    label: (item.labels || [])[0]?.text,
    production_dates_end: (item.production_date || [])[0]?.end,
    production_dates_start: (item.production_date || [])[0]?.start,
    titles: (item.titles || [])[0]?.title,
  }
}

interface Dimension {
  notes: string
  part: string
  type: string
  unit: string
  value: string
}

interface Documentation {
  title: string
  author: string
  notes: string
  shelfmark: string
  year_of_publication: string
}

interface Exhibition {
  exhibition: string
  date_start: string
  date_end: string
  venue: string
}

interface Label {
  text: string
  type: string
  source: string
  date: string
}

interface ObjectName {
  name: string
}

interface Production {
  creator: string
  creator_forename: string
  creator_surname: string
  creator_date_of_birth: string
  creator_date_of_death: string
  creator_nationality: string
  creator_gender: string
  creator_lref: string
}

interface ProductionDate {
  start: string
  end: string
  period: string
}

interface Title {
  title: string
  language: string
}

interface AlternativeImage {
  mime_type: string
  iiif_id: string
  iiif_info: string
  width: number
  height: number
  size: number
  thumbnail: string
  native: string
  orientation: string
}

type RawArtObject = {
  id: string
  created: string
  modified: string
  current_location_name: string
  acquisition_date: string
  acquisition_date_precision: string
  dimensions: Dimension[]
  documentation: Documentation[]
  exhibitions: Exhibition[]
  labels?: Label[]
  materials: string[]
  object_names: ObjectName[]
  production?: Production[]
  production_date?: ProductionDate[]
  techniques: string[]
  titles?: Title[]
  number_of_parts: number
  object_number: string
  object_url: string
  frontend_url: string
  iiif_manifest: string
  enrichment_url: string
  similar_images_url: string
  production_dates_notes: string[]
  public_domain: boolean
  rights: string
  on_display: boolean
  alternative_images: AlternativeImage[]
  image_mime_type: string
  image_iiif_id: string
  image_iiif_info: string
  image_width: number
  image_height: number
  image_size: number
  image_thumbnail: string
  image_native: string
  image_orientation: string
  image_hq: boolean
  has_3d_file: boolean
  has_image: boolean
  colors: string[]
  suggested_bg_color: string[]
  entropy: number
  contrast: number
  saturation: number
  colortemp: number
  brightness: number
  media_video: string[]
  artist: string[]
}
