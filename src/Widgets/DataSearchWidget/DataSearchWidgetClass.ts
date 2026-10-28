import { provideWidgetClass } from 'scrivito'

export const DataSearchWidget = provideWidgetClass('DataSearchWidget', {
  attributes: {
    buttonColor: ['enum', { values: ['btn-primary', 'btn-secondary'] }],
    buttonLabel: 'string',
    // The margin used to be an enum of Bootstrap spacers.
    design: 'design',
    // The input is its own surface: the widget's design styles the group around it.
    fieldDesign: 'design',
    placeholder: 'string',
    urlParamName: 'string',
  },
})

export type DataSearchWidgetInstance = InstanceType<typeof DataSearchWidget>

export const DEFAULT_URL_PARAM_NAME = 'search'
