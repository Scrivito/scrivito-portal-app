import * as Scrivito from 'scrivito'

export const DataListWidget = Scrivito.provideWidgetClass('DataListWidget', {
  attributes: {
    content: 'widgetlist',
    data: 'datalocator',
    nothingFound: 'widgetlist',
    nrOfColumns: ['enum', { values: ['1', '2', '3', '4', '5', '6'] }],
  },
})
