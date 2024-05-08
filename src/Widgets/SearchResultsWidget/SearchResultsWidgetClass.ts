import { provideWidgetClass } from 'scrivito'

export const SearchResultsWidget = provideWidgetClass('SearchResultsWidget', {
  attributes: {
    readMoreLabel: 'string',
    resultsHeadline: 'string',
    resultsHeadline0: 'string',
    resultsHeadline1: 'string',
    resultsLoadingHeadline: 'string',
    searchButtonLabel: 'string',
    searchInputPlaceholder: 'string',
    showMoreResultsLabel: 'string',
    topBannerBackground: ['reference', { only: ['Image'] }],
  },
})

export type SearchResultsWidgetInstance = InstanceType<
  typeof SearchResultsWidget
>
