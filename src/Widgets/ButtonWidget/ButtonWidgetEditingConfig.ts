import { provideEditingConfig, Link } from 'scrivito'
import { ButtonWidget } from './ButtonWidgetClass'
import Thumbnail from './thumbnail.svg'

provideEditingConfig(ButtonWidget, {
  title: 'Button',
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
      description: 'Default: Primary color',
      values: [
        { value: 'btn-primary', title: 'Primary color' },
        { value: 'btn-secondary', title: 'Secondary color' },
        { value: 'btn-outline-primary', title: 'Primary outline color' },
        { value: 'btn-outline-secondary', title: 'Secondary outline color' },
        { value: 'custom', title: 'Custom color' },
        { value: 'custom-outline', title: 'Custom outline color' },
      ],
    },
    buttonColorCustom: {
      title: 'Custom button color',
      editor: 'colorPicker',
    },
    buttonSize: {
      title: 'Button size',
      description: 'Default: medium',
    },
    target: {
      title: 'Target',
      description: 'The target and text of the button.',
    },
  },
  properties: (widget) =>
    [
      'target',
      'alignment',
      'buttonColor',
      widget.get('buttonColor') === 'custom' ||
      widget.get('buttonColor') === 'custom-outline'
        ? 'buttonColorCustom'
        : null,
      'buttonSize',
    ].filter((p): p is string => typeof p === 'string'),
  initialContent: {
    alignment: 'left',
    buttonColor: 'btn-primary',
    buttonSize: 'medium',
  },
  validations: [
    [
      'target',

      (target: Link | null) => {
        if (!target) {
          return {
            message: 'The button target should be set.',
            severity: 'warning',
          }
        }
        if (!target.title()) {
          return {
            message: 'Providing the button title is recommended.',
            severity: 'info',
          }
        }
      },
    ],
  ],
})
