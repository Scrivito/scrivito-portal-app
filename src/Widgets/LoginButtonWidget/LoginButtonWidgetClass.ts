import { provideWidgetClass } from 'scrivito'

export const LoginButtonWidget = provideWidgetClass('LoginButtonWidget', {
  attributes: {
    title: 'string',
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
