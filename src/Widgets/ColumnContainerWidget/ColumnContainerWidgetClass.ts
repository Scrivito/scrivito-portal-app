import { provideWidgetClass } from 'scrivito'

export const ColumnContainerWidget = provideWidgetClass(
  'ColumnContainerWidget',
  {
    attributes: {
      columns: ['widgetlist', { only: 'ColumnWidget' }],
      // The vertical alignment of the columns used to be an enum of its own. It is the design's
      // `align-items` now — same property, per breakpoint. The space between the columns is the
      // design's `gap`, which is what the gutter and display-mode attributes used to decide.
      design: ['design', { kind: 'container' }],
      disableResponsiveAdaption: 'boolean',
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
