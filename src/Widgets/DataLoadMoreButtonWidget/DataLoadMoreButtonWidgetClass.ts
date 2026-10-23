import { provideWidgetClass } from 'scrivito'

export const DataLoadMoreButtonWidget = provideWidgetClass(
  'DataLoadMoreButtonWidget',
  {
    attributes: {
      alignment: ['enum', { values: ['left', 'center', 'right', 'block'] }],
      // The design goes on the button itself: padding, size, colors and corners are the
      // buttons own. `alignment` stays — it places the button in its row, which is the
      // wrappers business, and offers "Full width", which no single design property expresses.
      design: ['design', { kind: 'control' }],
      buttonColor: [
        'enum',
        {
          values: [
            'btn-primary',
            'btn-secondary',
            'btn-danger',
            'btn-outline-primary',
            'btn-outline-secondary',
            'btn-outline-danger',
          ],
        },
      ],
      buttonSize: ['enum', { values: ['small', 'medium', 'large'] }],
      title: 'string',
    },
  },
)
