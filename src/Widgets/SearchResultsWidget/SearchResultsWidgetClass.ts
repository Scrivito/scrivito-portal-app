import { provideObjClass } from 'scrivito'

export const SearchResults = provideObjClass('SearchResults', {
  attributes: {
    title: 'string',
    hideInNavigation: 'boolean',
    topBannerBackground: ['reference', { only: ['Image'] }],
  },
})
