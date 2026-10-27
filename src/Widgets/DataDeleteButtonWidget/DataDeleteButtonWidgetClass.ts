import { provideWidgetClass } from 'scrivito'

export const DataDeleteButtonWidget = provideWidgetClass(
  'DataDeleteButtonWidget',
  {
    attributes: {
      alignment: ['enum', { values: ['left', 'center', 'right', 'block'] }],
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
      cancelTitle: 'string',
      // The design goes on the button itself: padding, size, colors and corners are the
      // buttons own. `alignment` stays — it places the button in its row.
      design: 'design',
      confirmTitle: 'string',
      deletedMessage: 'string',
      redirectAfterDelete: 'reference',
      requireConfirmation: 'boolean',
      title: 'string',
    },
  },
)
