import { provideWidgetClass } from 'scrivito'

export const DataSearchWidget = provideWidgetClass('DataSearchWidget', {
  attributes: {
    buttonColor: ['enum', { values: ['btn-primary', 'btn-secondary'] }],
    placeholder: 'string',
  },
})
