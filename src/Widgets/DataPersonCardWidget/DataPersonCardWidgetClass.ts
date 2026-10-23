import { provideWidgetClass } from 'scrivito'

export const DataPersonCardWidget = provideWidgetClass('DataPersonCardWidget', {
  attributes: {
    data: 'datalocator',
    design: ['design', { kind: 'container' }],
    headline: 'string',
  },
})
