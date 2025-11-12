import { provideWidgetClass } from 'scrivito'

export const ColumnContainerWidget = provideWidgetClass(
  'ColumnContainerWidget',
  {
    attributes: {
      alignment: ['enum', { values: ['start', 'center', 'end', 'stretch'] }],
      columns: ['widgetlist', { only: 'ColumnWidget' }],
      disableGutters: 'boolean',
      disableResponsiveAdaption: 'boolean',
      layoutMode: ['enum', { values: ['grid', 'flex'] }],
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
