import { provideWidgetClass } from 'scrivito'

export const DataFormDeleteButtonWidget = provideWidgetClass(
  'DataFormDeleteButton',
  {
    attributes: {
      cancelTitle: 'string',
      confirmTitle: 'string',
      deletedMessage: 'string',
      redirectToAfterDelete: 'reference',
      title: 'string',
    },
  },
)
