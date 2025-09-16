import { provideEditingConfig } from 'scrivito'
import { DataCountWidget } from './DataCountWidgetClass'
import thumbnail from './thumbnail.svg'

provideEditingConfig(DataCountWidget, {
  title: 'Data Count',
  thumbnail,
  attributes: {
    alignment: {
      title: 'Alignment',
      description: 'Default: Left',
      values: [
        { value: 'left', title: 'Left' },
        { value: 'center', title: 'Center' },
        { value: 'right', title: 'Right' },
      ],
    },
    loadingHeadline: { title: 'Headline while loading items' },
    headline0: { title: 'Headline for 0 items' },
    headline1: { title: 'Headline for 1 item' },
    headline: {
      title: 'Headline for multiple items',
      description:
        'The placeholder __count__ represents the total number of items.',
    },
    margin: {
      title: 'Margin',
      description: 'Space below the widget. Default: mb-2',
    },
    style: {
      title: 'Style',
      description: 'Default: Body font size',
      values: [
        { value: 'body-font-size', title: 'Body font size' },
        { value: 'text-small', title: 'Text small' },
        { value: 'h1', title: 'Heading 1' },
        { value: 'h2', title: 'Heading 2' },
        { value: 'h3', title: 'Heading 3' },
        { value: 'h4', title: 'Heading 4' },
        { value: 'h5', title: 'Heading 5' },
        { value: 'h6', title: 'Heading 6' },
        { value: 'display-1', title: 'Display heading 1' },
        { value: 'display-2', title: 'Display heading 2' },
        { value: 'display-3', title: 'Display heading 3' },
        { value: 'display-4', title: 'Display heading 4' },
        { value: 'display-5', title: 'Display heading 5' },
        { value: 'display-6', title: 'Display heading 6' },
      ],
    },
  },
  properties: [
    'loadingHeadline',
    'headline0',
    'headline1',
    'headline',
    'alignment',
    'style',
    'margin',
  ],
  initialContent: {
    alignment: 'left',
    headline: '__count__ items',
    headline0: 'No items',
    headline1: '1 item',
    loadingHeadline: 'Items',
    style: 'body-font-size',
    margin: 'mb-2',
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
