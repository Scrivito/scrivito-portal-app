import { provideEditingConfig } from 'scrivito'
import { DataConditionWidget } from './DataConditionWidgetClass'
import Thumbnail from './thumbnail.svg'

provideEditingConfig(DataConditionWidget, {
  title: 'Conditional Group',
  thumbnail: Thumbnail,
  attributes: {
    attributeName: {
      title: 'Attribute name',
    },
    attributeValue: {
      title: 'Show if value is',
    },
  },
  properties: ['attributeName', 'attributeValue'],
  titleForContent: (widget) =>
    widget.get('attributeName')
      ? `If ${widget.get('attributeName')} is ${widget.get('attributeValue') || 'blank'}`
      : 'Conditional Group',
})
