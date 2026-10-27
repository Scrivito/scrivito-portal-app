import { provideWidgetClass } from 'scrivito'

export const ButtonWidget = provideWidgetClass('ButtonWidget', {
  attributes: {
    // The design goes on the button itself: padding, size, colors and corners are the
    // buttons own. `alignment` stays — it places the button in its row, which is the
    // wrappers business, and offers "Full width", which no single design property expresses.
    design: 'design',
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
    target: 'link',
  },
})
