import { provideEditingConfig } from 'scrivito'
import { DataCountWidget } from './DataCountWidgetClass'
import thumbnail from './thumbnail.svg'

provideEditingConfig(DataCountWidget, {
  title: 'Data Count',
  thumbnail,
  attributes: {
    loadingHeadline: { title: 'Headline while loading results' },
    headline0: { title: 'Headline for 0 results' },
    headline1: { title: 'Headline for 1 result' },
    headline: {
      title: 'Headline for multiple results',
      description:
        'The placeholder __count__ represents the total number of results.',
    },
  },
  properties: ['loadingHeadline', 'headline0', 'headline1', 'headline'],
  initialContent: {
    headline: '__count__ search results',
    headline0: 'No search results',
    headline1: '1 search result',
    loadingHeadline: 'Search results',
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
