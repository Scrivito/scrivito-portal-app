import { provideEditingConfig } from 'scrivito'
import { DataLabelWidget } from './DataLabelWidgetClass'
import Thumbnail from './thumbnail.svg'

provideEditingConfig(DataLabelWidget, {
  title: 'Data Label',
  thumbnail: Thumbnail,
  attributes: {
    attributeName: { title: 'Data item attribute name' },
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
      description: 'Default: Relative',
      values: [
        { value: 'relative', title: 'Relative' },
        { value: 'datetime', title: 'Date and time' },
        { value: 'date', title: 'Only date' },
      ],
    },
    marginBottom: {
      title: 'Add margin bottom?',
    },
  },
  properties: (widget) =>
    [
      'attributeName',
      'showAs',
      widget.get('showAs') === 'datetime' ? 'datetimeFormat' : null,
      'valueSize',
      'marginBottom',
    ].filter((p): p is string => typeof p === 'string'),
  initialContent: {
    label: 'Label',
    showAs: 'text',
    valueSize: 'body-font-size',
    marginBottom: false,
  },
})
