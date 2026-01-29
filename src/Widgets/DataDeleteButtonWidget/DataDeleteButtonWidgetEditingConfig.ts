import { provideEditingConfig } from 'scrivito'
import { DataDeleteButtonWidget } from './DataDeleteButtonWidgetClass'
import Thumbnail from './thumbnail.svg'
import {
  paddingEditAttributes,
  paddingGroup,
} from '../propertiesGroups/padding/paddingEditingConfig'

provideEditingConfig(DataDeleteButtonWidget, {
  title: 'Data Delete Button',
  thumbnail: Thumbnail,
  attributes: {
    alignment: {
      title: 'Alignment',
      description: 'Default: Left',
      values: [
        { value: 'left', title: 'Left' },
        { value: 'center', title: 'Center' },
        { value: 'right', title: 'Right' },
        { value: 'block', title: 'Full width' },
      ],
    },
    buttonColor: {
      title: 'Button color',
      description: 'Default: Danger color',
      values: [
        { value: 'btn-primary', title: 'Primary color' },
        { value: 'btn-secondary', title: 'Secondary color' },
        { value: 'btn-danger', title: 'Danger color' },
        { value: 'btn-outline-primary', title: 'Primary outline color' },
        { value: 'btn-outline-secondary', title: 'Secondary outline color' },
        { value: 'btn-outline-danger', title: 'Danger outline color' },
      ],
    },
    buttonSize: {
      title: 'Button size',
      description: 'Default: medium',
    },
    requireConfirmation: {
      title: 'Require confirmation?',
    },
    redirectAfterDelete: {
      title: 'Redirect after delete',
      description: 'Leave the attribute empty for no redirection.',
    },
    ...paddingEditAttributes,
  },
  propertiesGroups: [paddingGroup],
  properties: (widget) => [
    'title',
    'alignment',
    'buttonColor',
    'buttonSize',
    'requireConfirmation',
    ['confirmTitle', { enabled: widget.get('requireConfirmation') }],
    ['cancelTitle', { enabled: widget.get('requireConfirmation') }],
    'deletedMessage',
    'redirectAfterDelete',
  ],
  initialContent: {
    alignment: 'left',
    title: 'Delete item',
    requireConfirmation: true,
    confirmTitle: 'Confirm delete',
    cancelTitle: 'Cancel',
    deletedMessage: 'Deleted item',
    buttonColor: 'btn-danger',
    buttonSize: 'medium',
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
