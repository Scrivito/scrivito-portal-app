import { provideEditingConfig } from 'scrivito'
import { FooterWidget } from './FooterWidgetClass'
import Thumbnail from './thumbnail.svg'

provideEditingConfig(FooterWidget, {
  description: 'Shows the footer of the homepage.',
  thumbnail: Thumbnail,
  title: 'Footer',
})
