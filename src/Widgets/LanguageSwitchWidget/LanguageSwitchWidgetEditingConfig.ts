import { provideEditingConfig } from 'scrivito'
import { LanguageSwitchWidget } from './LanguageSwitchWidgetClass'
import Thumbnail from './thumbnail.svg'

provideEditingConfig(LanguageSwitchWidget, {
  title: 'Language Switch',
  thumbnail: Thumbnail,
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
