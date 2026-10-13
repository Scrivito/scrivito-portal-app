# JSON-LD validation: supported schema.org types

The `structuredData` page attribute is validated while editing by `validateStructuredData`
(`src/utils/validateStructuredData.ts`), based on the synchronous type handlers of
[`@adobe/structured-data-validator`](https://github.com/adobe/structured-data-validator).

"Required" means the handler reports an error if the property is missing. Everything else
it checks is only reported as a warning, except for missing optional (recommended)
properties, which are reported as info. The "Google use" lines reflect Google's
documentation as known at the time of writing and should be re-checked against the
current docs.

Types are nested under the type they are used in. A type that is used by several types is
listed as its own top-level entry and referenced from each type that uses it.

## Google rich result types

Types that Google documents as input for a rich result or a merchant feature.

### Article

- Required: none (warnings for `headline`, `image`, `author`, `datePublished`, `dateModified`)
- Google use: [Article](https://developers.google.com/search/docs/appearance/structured-data/article) markup helps Google understand the page and show better title text, images and date information in results (Search, Google News, Google Assistant). It has no required properties, and Google News features such as Top stories do not require the markup
- Related: `author` is a Person or an Organization and `image` an ImageObject

#### NewsArticle

- Required: none (same warnings as Article)
- Google use: same as Article ([Article](https://developers.google.com/search/docs/appearance/structured-data/article))

#### BlogPosting

- Required: none (same warnings as Article)
- Google use: same as Article ([Article](https://developers.google.com/search/docs/appearance/structured-data/article))

### Event

- Required: `name`, `startDate` (valid date), `location`
- Google use: [Event rich result](https://developers.google.com/search/docs/appearance/structured-data/event)
- Related: `organizer` is an Organization, `performer` a Person and `image` an ImageObject

#### Place

- Required: `address`
- Google use: `location` of an [Event rich result](https://developers.google.com/search/docs/appearance/structured-data/event)

#### VirtualLocation

- Required: `url`
- Google use: `location` of an [Event rich result](https://developers.google.com/search/docs/appearance/structured-data/event)

### Product

- Required: `name`, plus at least one of `aggregateRating`, `offers`, `review`
- Google use: [Product snippets](https://developers.google.com/search/docs/appearance/structured-data/product-snippet)

#### Offer

- Required: only when its parent is a Product: `price` or `priceSpecification.price` (number)
- Google use: [Product snippets](https://developers.google.com/search/docs/appearance/structured-data/product-snippet) (price, availability)

##### PriceSpecification

- Required: `price` (number)
- Google use: [Merchant listings](https://developers.google.com/search/docs/appearance/structured-data/merchant-listing) (unit pricing)

##### UnitPriceSpecification

- Required: `price` (number)
- Google use: [Merchant listings](https://developers.google.com/search/docs/appearance/structured-data/merchant-listing) (unit pricing)
- Related: QuantitativeValue

##### OfferShippingDetails

- Required: `deliveryTime`, `shippingDestination`, `shippingRate`, `shippingRate.currency`, and `shippingRate.value` or `shippingRate.maxValue`
- Google use: [Merchant listings](https://developers.google.com/search/docs/appearance/structured-data/merchant-listing), organization-level [shipping policy](https://developers.google.com/search/docs/appearance/structured-data/shipping-policy)

###### DefinedRegion

- Required: `addressCountry`
- Google use: part of the [shipping policy](https://developers.google.com/search/docs/appearance/structured-data/shipping-policy) and [return policy](https://developers.google.com/search/docs/appearance/structured-data/return-policy)

###### ShippingDeliveryTime

- Required: none (`handlingTime` and `transitTime` give warnings)
- Google use: part of the [shipping policy](https://developers.google.com/search/docs/appearance/structured-data/shipping-policy)
- Related: `handlingTime` and `transitTime` are QuantitativeValues

#### AggregateOffer

- Required: `lowPrice` (number), `priceCurrency` (3-letter code)
- Google use: [Product snippets](https://developers.google.com/search/docs/appearance/structured-data/product-snippet) (price range)

#### AggregateRating

- Required: `ratingValue` within `worstRating`..`bestRating` (default 0..5), plus `ratingCount` or `reviewCount`. At the document root also `itemReviewed` and `itemReviewed.name`
- Google use: [Review snippets](https://developers.google.com/search/docs/appearance/structured-data/review-snippet), only inside supported parents such as Product, Recipe, Event, Course, LocalBusiness
- Related: Rating (the same `ratingValue` rules apply)

#### Review

- Required: `author`, `reviewRating`. At the document root also `itemReviewed` and `itemReviewed.name`
- Google use: [Review snippets](https://developers.google.com/search/docs/appearance/structured-data/review-snippet), same parents as AggregateRating
- Related: `author` is a Person and `reviewRating` a Rating

#### Brand

- Required: `name`
- Role: Product property

#### Certification

- Required: `issuedBy`, `name`
- Google use: [Merchant listings](https://developers.google.com/search/docs/appearance/structured-data/merchant-listing) (for example EU energy labels)

#### PeopleAudience

- Required: none (warnings only)
- Google use: [Merchant listings](https://developers.google.com/search/docs/appearance/structured-data/merchant-listing) (apparel audience)

#### SizeSpecification

- Required: none (warnings only)
- Google use: [Merchant listings](https://developers.google.com/search/docs/appearance/structured-data/merchant-listing) (apparel size)

### Organization

- Required: `name`
- Google use: [Organization markup](https://developers.google.com/search/docs/appearance/structured-data/organization) (logo, name), and the home for the organization-level [return policy](https://developers.google.com/search/docs/appearance/structured-data/return-policy) and [shipping policy](https://developers.google.com/search/docs/appearance/structured-data/shipping-policy)

#### MerchantReturnPolicy

- Required: `applicableCountry` and `returnPolicyCategory`, or `merchantReturnLink` if nested in `Organization.hasMerchantReturnPolicy`
- Google use: [Merchant listings](https://developers.google.com/search/docs/appearance/structured-data/merchant-listing), organization-level [return policy](https://developers.google.com/search/docs/appearance/structured-data/return-policy)

### ImageObject

- Required: `contentUrl` or `url`. At the root also one of `creator`, `creditText`, `copyrightNotice`, `license`
- Google use: [Image metadata](https://developers.google.com/search/docs/appearance/structured-data/image-license-metadata) (licensable badge), and Article and Product images

## Other types

These have no Google feature of their own. They are value types referenced by the types above. `Brand` is one of them too, but it is listed under Product.

### Person

- Required: `name`
- Role: author or reviewer, and performer of an Event

### Rating

- Required: `ratingValue`, within `worstRating`..`bestRating` (default 0..5)
- Role: the `reviewRating` of a Review. AggregateRating applies the same rules

### QuantitativeValue

- Required: only in a UnitPriceSpecification: `unitCode`, `value`. Only in a ShippingDeliveryTime: `minValue`, `maxValue`, `unitCode`
- Role: value inside pricing and delivery times

## Limitations

- **No handler:** Recipe, JobPosting, VideoObject, BreadcrumbList, HowTo, FAQ, LocalBusiness
  and Course pass unchecked. Recipe, JobPosting, VideoObject, BreadcrumbList and HowTo
  exist in the package but are not registered.
- **Not vocabulary-checked:** unknown types and misspelled properties are not caught,
  because the package's schema.org check is async and Scrivito validations must be
  synchronous.
- **Context-dependent rules:** Offer is only checked under a Product. QuantitativeValue,
  MerchantReturnPolicy and the root-level Review, AggregateRating and ImageObject rules
  apply only in the contexts shown.
- **Product scope:** Product is checked against product snippets only. The package's
  merchant-listing handler is not registered because it demands `offers` and `image` and
  adds many optional warnings.
- **Google status:** Google has been retiring rich results (FAQ and HowTo are restricted
  or removed, and several niche ones were dropped in 2025). The "Google use" lines only
  say whether Google documents the type as an input, not that it still produces a
  visible result.
