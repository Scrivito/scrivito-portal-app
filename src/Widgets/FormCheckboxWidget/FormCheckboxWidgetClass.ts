import { provideWidgetClass } from 'scrivito'

export const FormCheckboxWidget = provideWidgetClass('FormCheckboxWidget', {
  attributes: {
    type: [
      'enum',
      {
        values: ['custom', 'accept_terms'].concat(
          import.meta.env.ENABLE_NEOLETTER_FORM_BUILDER_SUBSCRIPTION_FEATURE
            ? ['subscription']
            : [],
        ),
      },
    ],
    customFieldName: 'string',
    label: 'string',
    required: 'boolean',
    helpText: 'html',
  },
})
