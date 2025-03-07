import { provideEditingConfig } from 'scrivito'
import { LogoWidget } from './LogoWidgetClass'
import Thumbnail from './thumbnail.svg'

provideEditingConfig(LogoWidget, {
  title: 'Logo',
  thumbnail: Thumbnail,
  attributes: {
    brandLink: {
      title: 'Band link',
      description: 'Where should the logo link to?',
    },
  },
  properties: ['brandLink'],
})
