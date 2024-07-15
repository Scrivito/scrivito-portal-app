import { provideWidgetClass } from 'scrivito'

export const DataSearchWidget = provideWidgetClass('DataSearchWidget', {
  attributes: {
    buttonColor: ['enum', { values: ['btn-primary', 'btn-secondary'] }],
    placeholder: 'string',
    urlParamName: 'string',
  },
})

export const DEFAULT_URL_PARAM_NAME = 'search'
