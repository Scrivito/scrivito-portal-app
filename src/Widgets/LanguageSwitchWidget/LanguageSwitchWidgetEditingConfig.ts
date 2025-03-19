import { provideEditingConfig } from 'scrivito'
import { LanguageSwitchWidget } from './LanguageSwitchWidgetClass'

provideEditingConfig(LanguageSwitchWidget, {
  title: 'Language Switch',
  attributes: {
    alignment: {
      title: 'Alignment',
      description: 'Default: Left',
      values: [
        { value: 'left', title: 'Left' },
        { value: 'center', title: 'Center' },
        { value: 'right', title: 'Right' },
      ],
    },
  },
  properties: ['alignment'],
  initialContent: {
    alignment: 'left',
  },
})
