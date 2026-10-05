import AggregateOffer from '@adobe/structured-data-validator/src/types/AggregateOffer.js'
import AggregateRating from '@adobe/structured-data-validator/src/types/AggregateRating.js'
import BaseValidator, {
  type Condition,
  type PathElement,
  type StructuredDataIssue,
} from '@adobe/structured-data-validator/src/types/base.js'
import Brand from '@adobe/structured-data-validator/src/types/Brand.js'
import Certification from '@adobe/structured-data-validator/src/types/Certification.js'
import DefinedRegion from '@adobe/structured-data-validator/src/types/DefinedRegion.js'
import ImageObject from '@adobe/structured-data-validator/src/types/ImageObject.js'
import MerchantReturnPolicy from '@adobe/structured-data-validator/src/types/MerchantReturnPolicy.js'
import Offer from '@adobe/structured-data-validator/src/types/Offer.js'
import OfferShippingDetails from '@adobe/structured-data-validator/src/types/OfferShippingDetails.js'
import Organization from '@adobe/structured-data-validator/src/types/Organization.js'
import PeopleAudience from '@adobe/structured-data-validator/src/types/PeopleAudience.js'
import Person from '@adobe/structured-data-validator/src/types/Person.js'
import PriceSpecification from '@adobe/structured-data-validator/src/types/PriceSpecification.js'
import Product from '@adobe/structured-data-validator/src/types/Product.js'
import QuantitativeValue from '@adobe/structured-data-validator/src/types/QuantitativeValue.js'
import Rating from '@adobe/structured-data-validator/src/types/Rating.js'
import Review from '@adobe/structured-data-validator/src/types/Review.js'
import ShippingDeliveryTime from '@adobe/structured-data-validator/src/types/ShippingDeliveryTime.js'
import SizeSpecification from '@adobe/structured-data-validator/src/types/SizeSpecification.js'

// Google's Article requirements: https://developers.google.com/search/docs/appearance/structured-data/article
class ArticleValidator extends BaseValidator {
  getConditions(): Condition[] {
    return [
      this.recommended('headline', 'string'),
      this.recommended('image'),
      this.recommended('author'),
      this.recommended('datePublished', 'date'),
      this.recommended('dateModified', 'date'),
    ].map((condition) => condition.bind(this))
  }
}

type HandlerClass = typeof BaseValidator

// Mirrors the registry of the package's async `Validator`, which cannot be used
// because it lazy-loads its handlers via `import()`.
const HANDLERS: Record<string, HandlerClass[]> = {
  AggregateOffer: [AggregateOffer],
  AggregateRating: [AggregateRating],
  Article: [ArticleValidator],
  BlogPosting: [ArticleValidator],
  Brand: [Brand],
  Certification: [Certification],
  DefinedRegion: [DefinedRegion],
  ImageObject: [ImageObject],
  MerchantReturnPolicy: [MerchantReturnPolicy],
  NewsArticle: [ArticleValidator],
  Offer: [Offer],
  OfferShippingDetails: [OfferShippingDetails],
  Organization: [Organization],
  PeopleAudience: [PeopleAudience],
  Person: [Person],
  PriceSpecification: [PriceSpecification],
  Product: [Product],
  QuantitativeValue: [QuantitativeValue],
  Rating: [Rating],
  Review: [Review],
  ShippingDeliveryTime: [ShippingDeliveryTime],
  SizeSpecification: [SizeSpecification],
  UnitPriceSpecification: [PriceSpecification],
}

export function validateStructuredData(
  jsonLd: unknown,
): { message: string; severity: 'error' | 'warning' } | undefined {
  const issues = rootItems(jsonLd).flatMap((item, index) =>
    validateNode(item, [{ type: typeNames(item)[0], index }]),
  )
  if (issues.length === 0) return

  return {
    message: issues
      .map((issue) => `${pathLabel(issue.path)}: ${issue.issueMessage}`)
      .join('; '),
    severity: issues.some((issue) => issue.severity === 'ERROR')
      ? 'error'
      : 'warning',
  }
}

function rootItems(jsonLd: unknown): Record<string, unknown>[] {
  if (Array.isArray(jsonLd)) return jsonLd.flatMap(rootItems)
  if (!isRecord(jsonLd)) return []
  if (Array.isArray(jsonLd['@graph'])) return rootItems(jsonLd['@graph'])

  return [jsonLd]
}

function validateNode(
  data: unknown,
  path: PathElement[],
): StructuredDataIssue[] {
  if (Array.isArray(data)) {
    return data.flatMap((item, index) => {
      const last: PathElement = {
        ...path[path.length - 1],
        index,
        length: data.length,
      }
      if (isRecord(item) && item['@type']) last.type = typeNames(item)
      return validateNode(item, [...path.slice(0, -1), last])
    })
  }

  if (!isRecord(data) || !data['@type']) return []

  const ownIssues = typeNames(data).flatMap((type) =>
    (HANDLERS[type] ?? []).flatMap((Handler) =>
      new Handler({ dataFormat: 'jsonld', path, type }).validate(data),
    ),
  )

  const nestedIssues = Object.entries(data)
    .filter(([key, value]) => !key.startsWith('@') && isNestedObject(value))
    .flatMap(([property, value]) => {
      const element: PathElement = { property }
      const nested = Array.isArray(value) ? undefined : value
      if (isRecord(nested) && nested['@type']) element.type = typeNames(nested)
      return validateNode(value, [...path, element])
    })

  return [...ownIssues, ...nestedIssues]
}

function typeNames(data: Record<string, unknown>): string[] {
  const types = Array.isArray(data['@type']) ? data['@type'] : [data['@type']]

  return types
    .filter((type): type is string => typeof type === 'string')
    .map((type) => type.replace(/^(https?:\/\/schema\.org\/|schema:)/, ''))
}

function pathLabel(path: PathElement[]): string {
  return path
    .map((element) => element.property ?? [element.type].flat().join('/'))
    .join('.')
}

function isNestedObject(value: unknown): boolean {
  return Array.isArray(value) ? isRecord(value[0]) : isRecord(value)
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}
