import * as Scrivito from 'scrivito'
import { ButtonWidget } from './ButtonWidgetClass'

Scrivito.provideEditingConfig(ButtonWidget, {
  title: 'Button',
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
      title: 'Background color',
      description: 'Default: Primary color',
      values: [
        { value: 'btn-primary', title: 'Primary color' },
        { value: 'btn-secondary', title: 'Secondary color' },
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
  },
  properties: ['target', 'alignment', 'buttonColor', 'buttonSize'],
  initialContent: {
    alignment: 'left',
    buttonColor: 'btn-primary',
    buttonSize: 'medium',
  },
  validations: [
    [
      'target',

      (target: Scrivito.Link | null) => {
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
