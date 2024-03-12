import { provideWidgetClass } from 'scrivito'

export const DataDeleteButtonWidget = provideWidgetClass(
  'DataDeleteButtonWidget',
  {
    attributes: {
      buttonStyle: ['enum', { values: ['btn-danger', 'btn-outline-primary'] }],
      cancelTitle: 'string',
      confirmTitle: 'string',
      deletedMessage: 'string',
      redirectAfterDelete: 'reference',
      requireConfirmation: 'boolean',
      title: 'string',
    },
  },
)
