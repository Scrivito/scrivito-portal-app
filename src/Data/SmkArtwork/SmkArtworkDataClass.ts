import {
  DataConnectionError,
  DataConnectionFilters,
  provideDataClass,
} from 'scrivito'
import * as v from 'valibot'

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

      const responseSchema = v.object({
        items: v.array(RawArtworkSchema),
        found: v.number(),
      })

      const jsonResponse = await request.json()
      const parseResult = v.safeParse(responseSchema, jsonResponse)
      if (!parseResult.success) {
        throw new DataConnectionError(
          `Invalid API response: ${parseResult.issues.map((i) => i.message).join(', ')}`,
        )
      }
      const response = parseResult.output

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

const LabelSchema = v.object({
  date: v.optional(v.string()),
  source: v.optional(v.string()),
  text: v.optional(v.string()),
  type: v.optional(v.string()),
})

const ProductionSchema = v.object({
  creator_date_of_birth: v.optional(v.string()),
  creator_date_of_death: v.optional(v.string()),
  creator_forename: v.optional(v.string()),
  creator_gender: v.optional(v.string()),
  creator_lref: v.optional(v.string()),
  creator_nationality: v.optional(v.string()),
  creator_surname: v.optional(v.string()),
  creator: v.optional(v.string()),
})

const RawArtworkSchema = v.object({
  acquisition_date_precision: v.optional(v.string()),
  acquisition_date: v.optional(v.string()),
  artist: v.optional(v.array(v.string())),
  brightness: v.optional(v.number()),
  colors: v.optional(v.array(v.string())),
  colortemp: v.optional(v.number()),
  contrast: v.optional(v.number()),
  created: v.optional(v.string()),
  current_location_name: v.optional(v.string()),
  enrichment_url: v.optional(v.string()),
  entropy: v.optional(v.number()),
  frontend_url: v.optional(v.string()),
  has_3d_file: v.optional(v.boolean()),
  has_image: v.optional(v.boolean()),
  id: v.optional(v.string()),
  iiif_manifest: v.optional(v.string()),
  image_height: v.optional(v.number()),
  image_hq: v.optional(v.boolean()),
  image_iiif_id: v.optional(v.string()),
  image_iiif_info: v.optional(v.string()),
  image_mime_type: v.optional(v.string()),
  image_native: v.optional(v.string()),
  image_orientation: v.optional(v.string()),
  image_size: v.optional(v.number()),
  image_thumbnail: v.optional(v.string()),
  image_width: v.optional(v.number()),
  labels: v.optional(v.array(LabelSchema)),
  materials: v.optional(v.array(v.string())),
  media_video: v.optional(v.array(v.string())),
  modified: v.optional(v.string()),
  number_of_parts: v.optional(v.number()),
  object_names: v.optional(v.array(v.object({ name: v.string() }))),
  object_number: v.string(),
  object_url: v.optional(v.string()),
  on_display: v.optional(v.boolean()),
  production_date: v.optional(
    v.array(
      v.object({
        end: v.string(),
        period: v.string(),
        start: v.string(),
      }),
    ),
  ),
  production_dates_notes: v.optional(v.array(v.string())),
  production: v.optional(v.array(ProductionSchema)),
  public_domain: v.optional(v.boolean()),
  rights: v.optional(v.string()),
  saturation: v.optional(v.number()),
  similar_images_url: v.optional(v.string()),
  suggested_bg_color: v.optional(v.array(v.string())),
  techniques: v.optional(v.array(v.string())),
  titles: v.optional(
    v.array(
      v.object({
        language: v.string(),
        title: v.string(),
      }),
    ),
  ),
})

type RawArtwork = v.InferInput<typeof RawArtworkSchema>
