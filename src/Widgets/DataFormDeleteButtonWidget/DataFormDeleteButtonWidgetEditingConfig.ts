import { provideEditingConfig } from 'scrivito'
import { DataFormDeleteButtonWidget } from './DataFormDeleteButtonWidgetClass'

provideEditingConfig(DataFormDeleteButtonWidget, {
  title: 'Data Form Delete Button',
  properties: ['title', 'confirmTitle', 'cancelTitle', 'deletedMessage'],
  initialContent: {
    title: 'Delete item',
    confirmTitle: 'Confirm delete',
    cancelTitle: 'Cancel',
    deletedMessage: 'Deleted item',
  },
  validations: [
    [
      'title',
      (title) => {
        if (!title) return 'Please provide a title'
      },
    ],
    [
      'confirmTitle',
      (confirmTitle) => {
        if (!confirmTitle) return 'Please provide a confirm title'
      },
    ],
    [
      'cancelTitle',
      (cancelTitle) => {
        if (!cancelTitle) return 'Please provide a cancel title'
      },
    ],
  ],
})
