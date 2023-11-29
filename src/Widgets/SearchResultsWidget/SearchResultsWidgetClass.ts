import { provideWidgetClass } from 'scrivito'

export const SearchResultsWidget = provideWidgetClass('SearchResultsWidget', {
  attributes: {
    topBannerBackground: ['reference', { only: ['Image'] }],
  },
})
