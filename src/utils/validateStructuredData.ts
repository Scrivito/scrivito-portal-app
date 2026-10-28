import { Obj } from 'scrivito'
import { ensureObject } from './ensureObject'
import { ensureString } from './ensureString'
import AggregateOffer from '@adobe/structured-data-validator/src/types/AggregateOffer.js'
import AggregateRating from '@adobe/structured-data-validator/src/types/AggregateRating.js'
import BaseValidator, {
  type Condition,
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
import {
  collectIssues,
  summarizeIssues,
  typeNames,
  type HandlerClass,
  type Severity,
} from './validateWithHandlers'

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

// Google's Event requirements: https://developers.google.com/search/docs/appearance/structured-data/event
class EventValidator extends BaseValidator {
  getConditions(): Condition[] {
    return [
      this.required('name', 'string'),
      this.required('startDate', 'date'),
      this.required('location'),
      this.recommended('description', 'string'),
      this.recommended('endDate', 'date'),
      this.recommended('eventAttendanceMode', 'string'),
      this.recommended('eventStatus', 'string'),
      this.recommended('image'),
      this.recommended('offers'),
      this.recommended('organizer'),
      this.recommended('performer'),
    ].map((condition) => condition.bind(this))
  }
}

class PlaceValidator extends BaseValidator {
  getConditions(): Condition[] {
    return [this.required('address'), this.recommended('name', 'string')].map(
      (condition) => condition.bind(this),
    )
  }
}

class VirtualLocationValidator extends BaseValidator {
  getConditions(): Condition[] {
    return [this.required('url', 'url')].map((condition) =>
      condition.bind(this),
    )
  }
}

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
  Event: [EventValidator],
  ImageObject: [ImageObject],
  MerchantReturnPolicy: [MerchantReturnPolicy],
  NewsArticle: [ArticleValidator],
  Offer: [Offer],
  OfferShippingDetails: [OfferShippingDetails],
  Organization: [Organization],
  PeopleAudience: [PeopleAudience],
  Person: [Person],
  Place: [PlaceValidator],
  PriceSpecification: [PriceSpecification],
  Product: [Product],
  QuantitativeValue: [QuantitativeValue],
  Rating: [Rating],
  Review: [Review],
  ShippingDeliveryTime: [ShippingDeliveryTime],
  SizeSpecification: [SizeSpecification],
  UnitPriceSpecification: [PriceSpecification],
  VirtualLocation: [VirtualLocationValidator],
}

export function validateStructuredData(
  jsonLd: Record<string, unknown>,
  page: Obj,
): { message: string; severity: Severity } | undefined {
  const typeIssue = typeConsistencyIssue(jsonLd, page)

  return summarizeIssues(
    collectIssues(jsonLd, HANDLERS),
    typeIssue ? [{ message: typeIssue, severity: 'warning' }] : [],
  )
}

// The @type of a page should be the same in all of its language versions.
function typeConsistencyIssue(
  jsonLd: Record<string, unknown>,
  page: Obj,
): string | undefined {
  const types = typesLabel(jsonLd)
  if (!types) return

  const differences = page
    .versionsOnAllSites()
    .filter((version) => version.id() !== page.id())
    .flatMap((version) => {
      const versionTypes = typesLabel(parseJsonLd(version))
      return versionTypes && versionTypes !== types
        ? [`${version.language() ?? version.id()}: ${versionTypes}`]
        : []
    })
  if (differences.length === 0) return

  return `The @type differs from other language versions (this page: ${types}; ${differences.join('; ')})`
}

function parseJsonLd(page: Obj): Record<string, unknown> {
  try {
    return ensureObject(JSON.parse(ensureString(page.get('structuredData'))))
  } catch {
    return {}
  }
}

function typesLabel(jsonLd: Record<string, unknown>): string {
  return typeNames(jsonLd).sort().join(', ')
}
