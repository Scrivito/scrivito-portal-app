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
      description: 'Default: Only date',
      values: [
        { value: 'date', title: 'Only date' },
        { value: 'datetime', title: 'Date and time' },
        { value: 'relative', title: 'Relative' },
      ],
    },
    marginBottom: {
      title: 'Add margin bottom?',
    },
    data: {
      restrictDataTo: ['itemAttribute'],
    },
  },
  properties: (widget) =>
    [
      'showAs',
      widget.get('showAs') === 'datetime' ? 'datetimeFormat' : null,
      'valueSize',
      'marginBottom',
    ].filter((p): p is string => typeof p === 'string'),
  initialContent: {
    datetimeFormat: 'date',
    label: 'Label',
    marginBottom: false,
    showAs: 'text',
    valueSize: 'body-font-size',
  },
})
