import { provideWidgetClass } from 'scrivito'

export const DataColumnListWidget = provideWidgetClass('DataColumnListWidget', {
  attributes: {
    columnsCount: ['enum', { values: ['1', '2', '3', '4', '5', '6'] }],
    content: 'widgetlist',
  },
})
