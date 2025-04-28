import { provideEditingConfig } from 'scrivito'
import { DataFormOptionsWidget } from './DataFormOptionsWidgetClass'
import Thumbnail from './thumbnail.svg'
import { insideDataFormContainerValidation } from '../DataFormContainerWidget/insideDataFormContainerValidation'

provideEditingConfig(DataFormOptionsWidget, {
  title: 'Data Form Options',
  thumbnail: Thumbnail,
  attributes: {
    attributeName: {
      title: 'Name of the data attribute in question',
    },
    data: {
      restrictDataTo: ['scopeAttribute', 'itemAttribute'],
    },
    required: { title: 'Mandatory?' },
    helpText: { title: 'Help text' },
  },
  properties: [
    'attributeName',
    'defaultValue',
    'label',
    'required',
    'helpText',
  ],
  initialContent: {
    label: 'Custom field',
  },
  validations: [insideDataFormContainerValidation],
})
