import { provideWidgetClass } from 'scrivito'

export const DataFormDeleteButtonWidget = provideWidgetClass(
  'DataFormDeleteButton',
  {
    attributes: {
      title: 'string',
      confirmTitle: 'string',
      cancelTitle: 'string',
      deletedMessage: 'string',
    },
  },
)
