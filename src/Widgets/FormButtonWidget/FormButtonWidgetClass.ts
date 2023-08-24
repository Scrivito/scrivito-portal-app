import { provideWidgetClass } from 'scrivito'

export const FormButtonWidget = provideWidgetClass('FormButtonWidget', {
  attributes: {
    buttonText: 'string',
    alignment: ['enum', { values: ['left', 'center', 'right', 'block'] }],
  },
  extractTextAttributes: ['buttonText'],
})
