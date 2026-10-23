import { provideWidgetClass } from 'scrivito'

export const DataFormSubmitButtonWidget = provideWidgetClass(
  'DataFormSubmitButtonWidget',
  {
    attributes: {
      submitTitle: 'string',
      // The design goes on the button itself: padding, size, colors and corners are the
      // buttons own. `alignment` stays — it places the button in its row, which is the
      // wrappers business, and offers "Full width", which no single design property expresses.
      design: ['design', { kind: 'control' }],
      hasReset: 'boolean',
      resetTitle: 'string',
      size: ['enum', { values: ['small', 'medium', 'large'] }],
      alignment: ['enum', { values: ['left', 'center', 'right', 'block'] }],
    },
  },
)
