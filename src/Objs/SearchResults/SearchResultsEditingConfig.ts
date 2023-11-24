import { provideEditingConfig } from 'scrivito'
import { SearchResults } from './SearchResultsObjClass'
import { classNameToThumbnail } from '../../utils/classNameToThumbnail'

provideEditingConfig(SearchResults, {
  title: 'Search Results',
  thumbnail: classNameToThumbnail('SearchResults'),
  attributes: {
    topBannerBackground: {
      title: 'Top banner background',
      description: 'This background will be shown on this page.',
    },
  },
  properties: ['title', 'topBannerBackground'],
  initialContent: {
    title: 'Search Results',
    hideInNavigation: true,
  },
  hideInSelectionDialogs: true,
})
