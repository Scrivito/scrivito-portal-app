import { provideWidgetClass } from 'scrivito'

export const DataGroupWidget = provideWidgetClass('DataGroupWidget', {
  attributes: {
    content: 'widgetlist',
    data: 'datalocator',
  },
})
