import { provideWidgetClass } from 'scrivito'

export const ColumnWidget = provideWidgetClass('ColumnWidget', {
  onlyInside: 'ColumnContainerWidget',
  attributes: {
    colSize: 'integer',
    content: 'widgetlist',
  },
  extractTextAttributes: ['content'],
})
