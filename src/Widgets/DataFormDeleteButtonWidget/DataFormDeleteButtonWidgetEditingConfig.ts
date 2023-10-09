import { provideEditingConfig } from 'scrivito'
import { DataFormDeleteButtonWidget } from './DataFormDeleteButtonWidgetClass'
import { classNameToThumbnail } from '../../utils/classNameToThumbnail'

provideEditingConfig(DataFormDeleteButtonWidget, {
  title: 'Data Delete Button',
  thumbnail: classNameToThumbnail('DataFormDeleteButtonWidget'),
  attributes: {
    redirectToAfterDelete: {
      title: 'Redirect to after delete',
      description: 'If no item is set, the parent of the current obj is used.',
    },
    buttonStyle: {
      title: 'Button style',
      description: 'Default: btn-danger',
    },
  },
  properties: (widget) => [
    'title',
    'requireConfirmation',
    ['confirmTitle', { enabled: widget.get('requireConfirmation') }],
    ['cancelTitle', { enabled: widget.get('requireConfirmation') }],
    'deletedMessage',
    'redirectToAfterDelete',
    'buttonStyle',
  ],
  initialContent: {
    title: 'Delete item',
    requireConfirmation: true,
    confirmTitle: 'Confirm delete',
    cancelTitle: 'Cancel',
    deletedMessage: 'Deleted item',
    buttonStyle: 'btn-danger',
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
