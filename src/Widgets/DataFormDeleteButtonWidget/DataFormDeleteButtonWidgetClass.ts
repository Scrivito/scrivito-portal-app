import { provideWidgetClass } from 'scrivito'

export const DataFormDeleteButtonWidget = provideWidgetClass(
  'DataFormDeleteButton',
  {
    attributes: {
      cancelTitle: 'string',
      requireConfirmation: 'boolean',
      confirmTitle: 'string',
      deletedMessage: 'string',
      redirectToAfterDelete: 'reference',
      title: 'string',
    },
  },
)
