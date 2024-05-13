import { provideWidgetClass } from 'scrivito'

export const DataPersonCardWidget = provideWidgetClass('DataPersonCardWidget', {
  attributes: {
    data: 'datalocator',
    headline: 'string',
  },
})
