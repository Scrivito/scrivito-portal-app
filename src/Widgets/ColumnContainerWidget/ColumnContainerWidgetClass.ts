import { provideWidgetClass } from 'scrivito'
import { paddingAttributes } from '../propertiesGroups/padding/paddingAttributes'

export const ColumnContainerWidget = provideWidgetClass(
  'ColumnContainerWidget',
  {
    attributes: {
      alignment: ['enum', { values: ['start', 'center', 'end', 'stretch'] }],
      columns: ['widgetlist', { only: 'ColumnWidget' }],
      disableGutters: 'boolean',
      disableResponsiveAdaption: 'boolean',
      layoutMode: ['enum', { values: ['grid', 'flex'] }],
      ...paddingAttributes,
    },
    extractTextAttributes: ['columns'],
  },
)

export type ColumnContainerWidgetInstance = InstanceType<
  typeof ColumnContainerWidget
>

export function isColumnContainerWidgetInstance(
  item: unknown,
): item is ColumnContainerWidgetInstance {
  return item instanceof ColumnContainerWidget
}
