import { provideWidgetClass } from 'scrivito'

export const FormCheckboxWidget = provideWidgetClass('FormCheckboxWidget', {
  attributes: {
    type: [
      'enum',
      {
        values: ['custom', 'accept_terms', 'subscription'],
      },
    ],
    customFieldName: 'string',
    label: 'string',
    required: 'boolean',
    helpText: 'html',
  },
})
