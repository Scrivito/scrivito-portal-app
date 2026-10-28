import { provideWidgetClass } from 'scrivito'

export const DataPersonCardWidget = provideWidgetClass('DataPersonCardWidget', {
  attributes: {
    data: 'datalocator',
    design: 'design',
    // Styles every person card the widget repeats; the widget's own design styles the list.
    cardDesign: 'design',
    headline: 'string',
  },
})
