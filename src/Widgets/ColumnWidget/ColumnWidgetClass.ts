import { provideWidgetClass } from 'scrivito'

export const ColumnWidget = provideWidgetClass('ColumnWidget', {
  onlyInside: 'ColumnContainerWidget',
  attributes: {
    // The column's share of the row, as a weight: the container turns the weights into grid
    // tracks, so they need not add up to anything in particular.
    colSize: 'integer',
    content: 'widgetlist',
    design: ['design', { kind: 'container' }],
  },
  extractTextAttributes: ['content'],
})

export type ColumnWidgetInstance = InstanceType<typeof ColumnWidget>
