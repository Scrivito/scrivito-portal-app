import { provideEditingConfig, Link } from 'scrivito'
import { ButtonWidget } from './ButtonWidgetClass'
import Thumbnail from './thumbnail.svg'
import { ButtonCustomColorPicker } from './ButtonCustomColorPicker'

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
    buttonSize: {
      title: 'Button size',
      description: 'Default: medium',
    },
    target: {
      title: 'Target',
      description: 'The target and text of the button.',
    },
    customButtonColor: {
      title: 'Custom button color',
      description: 'The custom color for the button (hex, rgb, or color name).',
    },
  },
  propertiesGroups: [
    {
      title: 'Button',
      properties: ['target', 'alignment', 'buttonColor', 'buttonSize'],
      key: 'button-main-group',
    },
    {
      title: 'Custom Color',
      component: ButtonCustomColorPicker,
      properties: ['customButtonColor'],
      key: 'button-custom-color-group',
    },
  ],
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
