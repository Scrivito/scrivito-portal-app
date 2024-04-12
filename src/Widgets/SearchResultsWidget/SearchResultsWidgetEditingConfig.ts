import { provideEditingConfig } from 'scrivito'
import { SearchResultsWidget } from './SearchResultsWidgetClass'
import Thumbnail from './thumbnail.svg'

provideEditingConfig(SearchResultsWidget, {
  title: 'Search Results',
  thumbnail: Thumbnail,
  attributes: {
    readMoreLabel: { title: 'Read-more buttons label' },
    resultsHeadline0: { title: 'Headline for 0 results' },
    resultsHeadline1: { title: 'Headline for 1 result' },
    resultsHeadline: {
      title: 'Headline',
      description:
        'The placeholder __count__ represents the total number of results.',
    },
    showMoreResultsLabel: { title: 'Show-more-results button label' },
    topBannerBackground: {
      title: 'Top banner background',
      description: 'This background will be shown behind the search input.',
    },
  },
  properties: [
    'topBannerBackground',
    'searchInputPlaceholder',
    'searchButtonLabel',
    'resultsHeadline0',
    'resultsHeadline1',
    'resultsHeadline',
    'readMoreLabel',
    'showMoreResultsLabel',
  ],
  initialContent: {
    readMoreLabel: 'Read more',
    resultsHeadline: '__count__ search results',
    resultsHeadline0: 'No search results',
    resultsHeadline1: '1 search result',
    searchButtonLabel: 'Search again',
    searchInputPlaceholder: 'Search',
    showMoreResultsLabel: 'Load more',
  },
  validations: [
    [
      'resultsHeadline',
      (headline) =>
        !headline && {
          severity: 'warning',
          message: 'The headline should be set.',
        },
    ],
    [
      'resultsHeadline0',
      (headline) =>
        !headline && {
          severity: 'warning',
          message: 'The headline for 0 results should be set.',
        },
    ],
    [
      'resultsHeadline1',
      (headline) =>
        !headline && {
          severity: 'warning',
          message: 'The headline for 1 result should be set.',
        },
    ],
    [
      'showMoreResultsLabel',
      (showMoreResultsLabel) =>
        !showMoreResultsLabel && {
          severity: 'error',
          message: 'The show-more-results label must be set.',
        },
    ],
  ],
})
