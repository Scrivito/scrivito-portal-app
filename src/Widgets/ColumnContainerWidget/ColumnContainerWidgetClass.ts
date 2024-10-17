import { provideWidgetClass } from 'scrivito'

export const ColumnContainerWidget = provideWidgetClass(
  'ColumnContainerWidget',
  {
    attributes: {
      columns: ['widgetlist', { only: 'ColumnWidget' }],
      alignment: ['enum', { values: ['start', 'center', 'end', 'stretch'] }],
      disableResponsiveAdaption: 'boolean',
      layoutMode: ['enum', { values: ['grid', 'flex'] }],
      noGutters: 'boolean',
    },
    extractTextAttributes: ['columns'],
  },
)

export type ColumnContainerWidgetInstance = InstanceType<
  typeof ColumnContainerWidget
>
