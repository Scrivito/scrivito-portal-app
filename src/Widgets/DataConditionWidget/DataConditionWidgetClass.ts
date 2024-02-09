import { provideWidgetClass } from 'scrivito'

export const DataConditionWidget = provideWidgetClass('DataConditionWidget', {
  attributes: {
    attributeName: 'string',
    attributeValue: 'string',
    content: 'widgetlist',
  },
})
