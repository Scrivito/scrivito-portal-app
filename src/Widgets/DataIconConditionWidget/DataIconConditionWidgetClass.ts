import { provideWidgetClass } from 'scrivito'

export const DataIconConditionWidget = provideWidgetClass(
  'DataIconConditionWidget',
  {
    attributes: {
      attributeValue: 'string',
      humanReadableValue: 'string',
      icon: 'string',
    },
    onlyInside: ['DataIconWidget'],
  },
)
