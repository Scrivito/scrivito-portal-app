import { provideWidgetClass } from 'scrivito'

export const CheckoutButtonWidget = provideWidgetClass('CheckoutButtonWidget', {
  attributes: {
    buttonText: 'string',
    successMessage: 'string',
    alignment: ['enum', { values: ['left', 'center', 'right', 'block'] }],
    buttonColor: [
      'enum',
      {
        values: [
          'btn-primary',
          'btn-secondary',
          'btn-outline-primary',
          'btn-outline-secondary',
        ],
      },
    ],
    buttonSize: ['enum', { values: ['small', 'medium', 'large'] }],
  },
})
