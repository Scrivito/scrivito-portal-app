import { provideEditingConfig } from 'scrivito'
import { DataCountWidget } from './DataCountWidgetClass'
import thumbnail from './thumbnail.svg'

provideEditingConfig(DataCountWidget, {
  title: 'Data Count',
  thumbnail,
  attributes: {
    loadingHeadline: { title: 'Headline while loading items' },
    headline0: { title: 'Headline for 0 items' },
    headline1: { title: 'Headline for 1 item' },
    headline: {
      title: 'Headline for multiple items',
      description:
        'The placeholder __count__ represents the total number of items.',
    },
  },
  properties: ['loadingHeadline', 'headline0', 'headline1', 'headline'],
  initialContent: {
    headline: '__count__ items',
    headline0: 'No items',
    headline1: '1 item',
    loadingHeadline: 'Items',
  },
  validations: [
    [
      'headline',
      (headline) =>
        !headline && {
          severity: 'warning',
          message: 'The headline should be set.',
        },
    ],
    [
      'headline0',
      (headline) =>
        !headline && {
          severity: 'warning',
          message: 'The headline for 0 results should be set.',
        },
    ],
    [
      'headline1',
      (headline) =>
        !headline && {
          severity: 'warning',
          message: 'The headline for 1 result should be set.',
        },
    ],
  ],
})
