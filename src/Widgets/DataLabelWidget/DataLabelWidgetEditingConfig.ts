import { provideEditingConfig } from 'scrivito'
import { DataLabelWidget } from './DataLabelWidgetClass'
import Thumbnail from './thumbnail.svg'

provideEditingConfig(DataLabelWidget, {
  title: 'Data Label',
  thumbnail: Thumbnail,
  attributes: {
    showAs: {
      title: 'Show as',
      description: 'Default: Text',
      values: [
        { value: 'text', title: 'Text' },
        { value: 'currency', title: 'Currency' },
        { value: 'datetime', title: 'Date' },
        { value: 'link', title: 'Link' },
      ],
    },
    datetimeFormat: {
      title: 'Date format',
      description: 'Default: Date only',
      values: [
        { value: 'year', title: 'Year only' },
        { value: 'date', title: 'Date only' },
        { value: 'datetime', title: 'Date and time' },
        { value: 'relative', title: 'Relative' },
      ],
    },
    marginBottom: {
      title: 'Add margin bottom?',
    },
    valueSize: {
      title: 'Value size',
      description: 'Default: Body font size',
      values: [
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
        { value: 'text-small', title: 'Text small' },
        { value: 'body-font-size', title: 'Body font size' },
      ],
    },
    data: {
      restrictDataTo: ['itemAttribute'],
    },
  },
  properties: (widget) => [
    'showAs',
    ...(widget.get('showAs') === 'datetime' ? ['datetimeFormat'] : []),
    'valueSize',
    'marginBottom',
  ],
  initialContent: {
    datetimeFormat: 'date',
    label: 'Label',
    marginBottom: false,
    showAs: 'text',
    valueSize: 'body-font-size',
  },
})
