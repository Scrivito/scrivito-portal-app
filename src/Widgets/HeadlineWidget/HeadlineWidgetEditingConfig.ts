import { provideEditingConfig } from 'scrivito'
import { HeadlineWidget } from './HeadlineWidgetClass'
import Thumbnail from './thumbnail.svg'

provideEditingConfig(HeadlineWidget, {
  title: 'Headline',
  thumbnail: Thumbnail,
  attributes: {
    style: {
      title: 'Style',
      description: 'Size and font of this headline. Default: Heading 2',
      values: [
        { value: 'h1', title: 'Heading 1' },
        { value: 'h2', title: 'Heading 2' },
        { value: 'h3', title: 'Heading 3' },
        { value: 'h4', title: 'Heading 4' },
        { value: 'h5', title: 'Heading 5' },
        { value: 'h6', title: 'Heading 6' },
      ],
    },
    level: {
      title: 'Heading tag (optional)',
      description:
        'May be used for SEO, for generating a table of contents,' +
        ' or for improving accessibility. Default: Derived from Style',
      values: [
        { value: 'h1', title: 'h1' },
        { value: 'h2', title: 'h2' },
        { value: 'h3', title: 'h3' },
        { value: 'h4', title: 'h4' },
        { value: 'h5', title: 'h5' },
        { value: 'h6', title: 'h6' },
      ],
    },
    alignment: {
      title: 'Alignment',
      description: 'Default: Left',
      values: [
        { value: 'left', title: 'Left' },
        { value: 'center', title: 'Center' },
        { value: 'right', title: 'Right' },
      ],
    },
    uppercase: { title: 'Uppercase?', description: 'Default: No' },
  },
  properties: ['style', 'level', 'alignment', 'uppercase'],
  initialContent: {
    alignment: 'left',
    headline: 'Headline',
    style: 'h2',
  },
  validations: [
    [
      'headline',

      (headline) => {
        if (!headline) {
          return { message: 'The headline must be set.', severity: 'error' }
        }
      },
    ],
  ],
})
