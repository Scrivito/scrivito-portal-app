import { provideEditingConfig } from 'scrivito'
import { SideNavigationWidget } from './SideNavigationWidgetClass'
import Thumbnail from './thumbnail.svg'

provideEditingConfig(SideNavigationWidget, {
  title: 'Side Navigation',
  thumbnail: Thumbnail,
})
