import { provideWidgetClass } from 'scrivito'

export const DataListWidget = provideWidgetClass('DataListWidget', {
  attributes: {
    content: 'widgetlist',
    data: 'datalocator',
    footer: 'widgetlist',
    nothingFound: 'widgetlist',
    nrOfColumns: ['enum', { values: ['1', '2', '3', '4', '5', '6'] }],
    showFooter: 'boolean',
  },
})
