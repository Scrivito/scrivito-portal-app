import { provideEditingConfig } from 'scrivito'
import { SearchResultsWidget } from './SearchResultsWidgetClass'
import { classNameToThumbnail } from '../../utils/classNameToThumbnail'

provideEditingConfig(SearchResultsWidget, {
  title: 'Search Results',
  thumbnail: classNameToThumbnail('SearchResultsWidget'),
  attributes: {
    topBannerBackground: {
      title: 'Top banner background',
      description: 'This background will be shown beneath the search input.',
    },
  },
  properties: ['topBannerBackground'],
})
