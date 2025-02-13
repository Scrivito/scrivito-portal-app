import { provideWidgetClass } from 'scrivito'

export const DataCountWidget = provideWidgetClass('DataCountWidget', {
  attributes: {
    headline: 'string',
    headline0: 'string',
    headline1: 'string',
    level: ['enum', { values: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'div'] }],
    loadingHeadline: 'string',
    style: [
      'enum',
      {
        values: [
          'display-1',
          'display-2',
          'display-3',
          'display-4',
          'display-5',
          'display-6',
          'h1',
          'h2',
          'h3',
          'h4',
          'h5',
          'h6',
          'text-small',
          'body-font-size',
        ],
      },
    ],
  },
})

export type DataCountWidgetInstance = InstanceType<typeof DataCountWidget>
