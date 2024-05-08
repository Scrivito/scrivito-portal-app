import { provideEditingConfig } from 'scrivito'
import { LoginButtonWidget } from './LogInButtonWidgetClass'
import Thumbnail from './thumbnail.svg'

provideEditingConfig(LoginButtonWidget, {
  title: 'LoginButton',
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
      ],
    },
    buttonSize: {
      title: 'Button size',
      description: 'Default: medium',
    },
  },
  properties: ['title', 'alignment', 'buttonColor', 'buttonSize'],
  initialContent: {
    alignment: 'left',
    buttonColor: 'btn-primary',
    buttonSize: 'medium',
    title: 'Login',
  },
})
