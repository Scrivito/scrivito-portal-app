import {
  DataConnectionError,
  DataConnectionFilters,
  provideDataClass,
} from 'scrivito'
import { z } from 'zod'

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

      const responseSchema = z.object({
        items: z.array(RawArtworkSchema),
        found: z.number(),
      })

      const jsonResponse = await request.json()
      const parseResult = responseSchema.safeParse(jsonResponse)
      if (!parseResult.success) {
        throw new DataConnectionError(
          `Invalid API response: ${parseResult.error.message}`,
        )
      }
      const response = parseResult.data

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

const LabelSchema = z.object({
  date: z.string().optional(),
  source: z.string().optional(),
  text: z.string().optional(),
  type: z.string().optional(),
})

const ProductionSchema = z.object({
  creator_date_of_birth: z.string().optional(),
  creator_date_of_death: z.string().optional(),
  creator_forename: z.string().optional(),
  creator_gender: z.string().optional(),
  creator_lref: z.string().optional(),
  creator_nationality: z.string().optional(),
  creator_surname: z.string().optional(),
  creator: z.string().optional(),
})

const RawArtworkSchema = z.object({
  acquisition_date_precision: z.string().optional(),
  acquisition_date: z.string().optional(),
  artist: z.array(z.string()).optional(),
  brightness: z.number().optional(),
  colors: z.array(z.string()).optional(),
  colortemp: z.number().optional(),
  contrast: z.number().optional(),
  created: z.string().optional(),
  current_location_name: z.string().optional(),
  enrichment_url: z.string().optional(),
  entropy: z.number().optional(),
  frontend_url: z.string().optional(),
  has_3d_file: z.boolean().optional(),
  has_image: z.boolean().optional(),
  id: z.string().optional(),
  iiif_manifest: z.string().optional(),
  image_height: z.number().optional(),
  image_hq: z.boolean().optional(),
  image_iiif_id: z.string().optional(),
  image_iiif_info: z.string().optional(),
  image_mime_type: z.string().optional(),
  image_native: z.string().optional(),
  image_orientation: z.string().optional(),
  image_size: z.number().optional(),
  image_thumbnail: z.string().optional(),
  image_width: z.number().optional(),
  labels: z.array(LabelSchema).optional(),
  materials: z.array(z.string()).optional(),
  media_video: z.array(z.string()).optional(),
  modified: z.string().optional(),
  number_of_parts: z.number().optional(),
  object_names: z.array(z.object({ name: z.string() })).optional(),
  object_number: z.string(),
  object_url: z.string().optional(),
  on_display: z.boolean().optional(),
  production_date: z
    .array(
      z.object({
        end: z.string(),
        period: z.string(),
        start: z.string(),
      }),
    )
    .optional(),
  production_dates_notes: z.array(z.string()).optional(),
  production: z.array(ProductionSchema).optional(),
  public_domain: z.boolean().optional(),
  rights: z.string().optional(),
  saturation: z.number().optional(),
  similar_images_url: z.string().optional(),
  suggested_bg_color: z.array(z.string()).optional(),
  techniques: z.array(z.string()).optional(),
  titles: z
    .array(
      z.object({
        language: z.string(),
        title: z.string(),
      }),
    )
    .optional(),
})

type RawArtwork = z.infer<typeof RawArtworkSchema>
