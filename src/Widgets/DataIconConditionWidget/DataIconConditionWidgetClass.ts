import { provideWidgetClass } from 'scrivito'

export const DataIconConditionWidget = provideWidgetClass(
  'DataIconConditionWidget',
  {
    attributes: {
      attributeValue: 'string',
      icon: 'string',
    },
    onlyInside: ['DataIconWidget'],
  },
)
