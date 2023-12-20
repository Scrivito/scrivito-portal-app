import { provideEditingConfig } from 'scrivito'
import { SearchResultsWidget } from './SearchResultsWidgetClass'
import Thumbnail from './thumbnail.svg'

provideEditingConfig(SearchResultsWidget, {
  title: 'Search Results',
  thumbnail: Thumbnail,
  attributes: {
    topBannerBackground: {
      title: 'Top banner background',
      description: 'This background will be shown behind the search input.',
    },
  },
  properties: ['topBannerBackground'],
})
