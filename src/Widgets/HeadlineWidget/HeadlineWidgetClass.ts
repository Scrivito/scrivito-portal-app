import { provideWidgetClass } from 'scrivito'
import { paddingAttributes } from '../paddingAttributes'
import { textStyleAttributes } from '../textStyleAttributes'

export const HeadlineWidget = provideWidgetClass('HeadlineWidget', {
  attributes: {
    alignment: ['enum', { values: ['left', 'center', 'right'] }],
    headline: 'string',
    level: ['enum', { values: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'div'] }],
    margin: [
      'enum',
      { values: ['mb-0', 'mb-1', 'mb-2', 'mb-3', 'mb-4', 'mb-5'] },
    ],
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
          'label-headline',
          'label-subtitle',
        ],
      },
    ],
    uppercase: 'boolean', // TODO: Remove, because of textTransform
    ...textStyleAttributes,
    ...paddingAttributes,
  },
  extractTextAttributes: ['headline'],
})
