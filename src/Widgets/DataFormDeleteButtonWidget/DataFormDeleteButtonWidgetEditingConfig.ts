import { provideEditingConfig } from 'scrivito'
import { DataFormDeleteButtonWidget } from './DataFormDeleteButtonWidgetClass'
import Thumbnail from './thumbnail.svg'

provideEditingConfig(DataFormDeleteButtonWidget, {
  title: 'Data Delete Button',
  thumbnail: Thumbnail,
  attributes: {
    buttonStyle: {
      title: 'Button style',
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
    'requireConfirmation',
    ['confirmTitle', { enabled: widget.get('requireConfirmation') }],
    ['cancelTitle', { enabled: widget.get('requireConfirmation') }],
    'deletedMessage',
    'redirectAfterDelete',
    'buttonStyle',
  ],
  initialContent: {
    title: 'Delete item',
    requireConfirmation: true,
    confirmTitle: 'Confirm delete',
    cancelTitle: 'Cancel',
    deletedMessage: 'Deleted item',
    buttonStyle: 'btn-danger',
    redirectAfterDelete: true,
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
