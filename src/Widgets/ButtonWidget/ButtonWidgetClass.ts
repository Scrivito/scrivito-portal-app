import { provideWidgetClass } from 'scrivito'

export const ButtonWidget = provideWidgetClass('ButtonWidget', {
  attributes: {
    alignment: ['enum', { values: ['left', 'center', 'right', 'block'] }],
    buttonColor: [
      'enum',
      {
        values: [
          'btn-primary',
          'btn-secondary',
          'btn-outline-primary',
          'btn-outline-secondary',
          'custom',
          'custom-outline',
        ],
      },
    ],
    buttonColorCustom: 'string',
    buttonSize: ['enum', { values: ['small', 'medium', 'large'] }],
    target: 'link',
  },
})
