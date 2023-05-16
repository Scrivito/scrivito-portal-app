import * as Scrivito from 'scrivito'
import { HeadlineWidget } from './HeadlineWidgetClass'

Scrivito.provideEditingConfig(HeadlineWidget, {
  title: 'Headline',
  attributes: {
    level: {
      title: 'Heading tag',
      description: 'Sets the headline tag. Default: h2',
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
  },
  properties: ['level', 'alignment'],
  initialContent: {
    alignment: 'left',
    headline: 'Lorem Ipsum',
    level: 'h2',
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
