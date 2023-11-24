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

export type DataIconConditionWidgetInstance = InstanceType<
  typeof DataIconConditionWidget
>

export function isDataIconConditionWidget(
  item: unknown,
): item is DataIconConditionWidgetInstance {
  return item instanceof DataIconConditionWidget
}
