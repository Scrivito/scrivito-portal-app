import { Obj } from 'scrivito'
import {
  buildStructuredData,
  buildSiteStructuredData,
  splitSiteStructuredData,
  splitStructuredData,
} from './buildStructuredData'
import { ensureObject, ensureString } from './helpers'
import {
  type StructuredDataNode,
  parseStructuredDataNodes,
} from './parseStructuredDataNodes'
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

type Result = { message: string; severity: Severity }

export function validateStructuredData(
  source: string,
  page: Obj,
): Result | undefined {
  const syntaxIssue = validateSyntax(source)
  if (syntaxIssue) return syntaxIssue
  if (!source.trim()) return

  const raw = splitStructuredData(page)
  const typeIssue = typeConsistencyIssue(raw[0], page)
  const extra: Result[] = [
    ...(typeIssue
      ? [{ message: typeIssue, severity: 'warning' as const }]
      : []),
    ...warnings([
      raw[0] &&
        'image' in raw[0] &&
        'The "image" property of the page node is ignored. Use the attribute "structuredDataImages" instead.',
    ]),
  ]

  return summarizeIssues(
    collectIssues({ '@graph': buildStructuredData(page) }, HANDLERS),
    extra,
  )
}

/** Validates the "siteStructuredData" of the homepage. */
export function validateSiteStructuredData(
  source: string,
  homepage: Obj,
): Result | undefined {
  const syntaxIssue = validateSyntax(source)
  if (syntaxIssue) return syntaxIssue
  if (!source.trim()) return

  const { organization, webSite, ignored } = splitSiteStructuredData(homepage)
  const built = buildSiteStructuredData(homepage)
  const extra = warnings([
    !organization && !webSite && 'Add an Organization and/or a WebSite.',
    ignored.length > 0 &&
      'Only the first Organization and the first WebSite are used. All other nodes are ignored.',
    organization &&
      'logo' in organization &&
      'The "logo" property of the Organization is ignored. Use the attribute "siteOrganizationLogo" instead.',
    webSite &&
      'url' in webSite &&
      'The "url" property of the WebSite is ignored. The homepage URL is used.',
    webSite &&
      !ensureString(webSite.name).trim() &&
      'The WebSite should contain a "name", which search engines use as the site name.',
  ])
  const structuredData = {
    '@graph': [built.organization, built.webSite].filter(
      (node) => node !== undefined,
    ),
  }

  return summarizeIssues(collectIssues(structuredData, HANDLERS), extra)
}

function warnings(messages: (string | false | undefined)[]): Result[] {
  return messages.flatMap((message) =>
    message ? [{ message, severity: 'warning' as const }] : [],
  )
}

// The checks that all kinds of structured data have in common.
function validateSyntax(source: string): Result | undefined {
  if (!source.trim()) return

  let root: Record<string, unknown>
  try {
    root = ensureObject(JSON.parse(source))
  } catch {
    return { message: 'Structured data must be valid JSON.', severity: 'error' }
  }

  if (source.toLowerCase().includes('</script')) {
    return {
      message: 'Structured data must not contain "</script".',
      severity: 'error',
    }
  }

  if (root['@context'] !== 'https://schema.org') {
    return {
      message:
        'Structured data must contain "@context" with the value "https://schema.org".',
      severity: 'error',
    }
  }

  const subject =
    '@graph' in root ? 'Every node of "@graph"' : 'Structured data'
  const nodes = parseStructuredDataNodes(source)
  if (nodes.some((node) => typeof node['@type'] !== 'string')) {
    return {
      message: `${subject} must contain "@type" with a string value.`,
      severity: 'error',
    }
  }
  if (nodes.some((node) => node['@type'] === 'BreadcrumbList')) {
    return {
      message:
        'Structured data must not contain a "BreadcrumbList". It is generated from the position of the page in the navigation.',
      severity: 'error',
    }
  }
  if (nodes.some((node) => !ensureString(node['@type']).trim())) {
    return {
      message: `The "@type" of ${subject.toLowerCase()} must not be empty.`,
      severity: 'error',
    }
  }
}

// The @type of a page should be the same in all of its language versions.
function typeConsistencyIssue(
  main: StructuredDataNode | undefined,
  page: Obj,
): string | undefined {
  const types = typesLabel(main)
  if (!types) return

  const differences = page
    .versionsOnAllSites()
    .filter((version) => version.id() !== page.id())
    .flatMap((version) => {
      const versionTypes = typesLabel(mainNode(version))
      return versionTypes && versionTypes !== types
        ? [`${version.language() ?? version.id()}: ${versionTypes}`]
        : []
    })
  if (differences.length === 0) return

  return `The @type differs from other language versions (this page: ${types}; ${differences.join('; ')})`
}

function mainNode(page: Obj): StructuredDataNode | undefined {
  try {
    return splitStructuredData(page)[0]
  } catch {
    return
  }
}

function typesLabel(node: StructuredDataNode | undefined): string {
  return node ? typeNames(node).sort().join(', ') : ''
}
