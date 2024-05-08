import { provideWidgetClass } from 'scrivito'

export const DataPersonCardWidget = provideWidgetClass('DataPersonCardWidget', {
  attributes: {
    attributeName: 'string',
    headline: 'string',
  },
})
