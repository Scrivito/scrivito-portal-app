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
      ],
    },
    currency: {
      title: 'Currency format',
      description: 'Default: Euro (€)',
      values: [
        { value: 'EUR', title: 'Euro (€)' },
        { value: 'USD', title: 'U.S. dollar ($)' },
        { value: 'PLN', title: 'Polish złoty (zł)' },
      ],
    },
    marginBottom: {
      title: 'Add margin bottom?',
    },
  },
  properties: (widget) => [
    'attributeName',
    'showAs',
    ['currency', { enabled: widget.get('showAs') === 'currency' }],
    'valueSize',
    'marginBottom',
  ],
  initialContent: {
    label: 'Label',
    showAs: 'text',
    currency: 'EUR',
    valueSize: 'body-font-size',
    marginBottom: true,
  },
})
