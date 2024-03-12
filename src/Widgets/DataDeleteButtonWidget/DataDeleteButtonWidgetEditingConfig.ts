import { provideEditingConfig } from 'scrivito'
import { DataDeleteButtonWidget } from './DataDeleteButtonWidgetClass'
import Thumbnail from './thumbnail.svg'

provideEditingConfig(DataDeleteButtonWidget, {
  title: 'Data Delete Button',
  thumbnail: Thumbnail,
  attributes: {
    buttonColor: {
      title: 'Button color',
      description: 'Default: btn-danger',
    },
    requireConfirmation: {
      title: 'Require confirmation?',
    },
    redirectAfterDelete: {
      title: 'Redirect after delete',
      description: 'Leave the attribute empty for no redirection.',
    },
  },
  properties: (widget) => [
    'title',
    'buttonColor',
    'requireConfirmation',
    ['confirmTitle', { enabled: widget.get('requireConfirmation') }],
    ['cancelTitle', { enabled: widget.get('requireConfirmation') }],
    'deletedMessage',
    'redirectAfterDelete',
  ],
  initialContent: {
    title: 'Delete item',
    requireConfirmation: true,
    confirmTitle: 'Confirm delete',
    cancelTitle: 'Cancel',
    deletedMessage: 'Deleted item',
    buttonColor: 'btn-danger',
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
      (confirmTitle, { widget }) => {
        if (!confirmTitle && widget.get('requireConfirmation')) {
          return 'Please provide a confirm title'
        }
      },
    ],
    [
      'cancelTitle',
      (cancelTitle, { widget }) => {
        if (!cancelTitle && widget.get('requireConfirmation')) {
          return 'Please provide a cancel title'
        }
      },
    ],
  ],
})
