import { provideWidgetClass } from 'scrivito'

export const DataSearchWidget = provideWidgetClass('DataSearchWidget', {
  attributes: {
    buttonColor: ['enum', { values: ['btn-primary', 'btn-secondary'] }],
    buttonLabel: 'string',
    margin: [
      'enum',
      { values: ['mb-0', 'mb-1', 'mb-2', 'mb-3', 'mb-4', 'mb-5'] },
    ],
    placeholder: 'string',
    urlParamName: 'string',
  },
})

export type DataSearchWidgetInstance = InstanceType<typeof DataSearchWidget>

export const DEFAULT_URL_PARAM_NAME = 'search'
