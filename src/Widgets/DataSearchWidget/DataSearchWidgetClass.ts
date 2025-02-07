import { provideWidgetClass } from 'scrivito'

export const DataSearchWidget = provideWidgetClass('DataSearchWidget', {
  attributes: {
    buttonColor: ['enum', { values: ['btn-primary', 'btn-secondary'] }],
    buttonLabel: 'string',
    placeholder: 'string',
    urlParamName: 'string',
  },
})

export type DataSearchWidgetInstance = InstanceType<typeof DataSearchWidget>

export const DEFAULT_URL_PARAM_NAME = 'search'
