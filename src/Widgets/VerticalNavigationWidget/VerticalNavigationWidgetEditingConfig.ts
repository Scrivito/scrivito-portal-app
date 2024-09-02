import { provideEditingConfig } from 'scrivito'
import { VerticalNavigationWidget } from './VerticalNavigationWidgetClass'
import Thumbnail from './thumbnail.svg'

provideEditingConfig(VerticalNavigationWidget, {
  title: 'Vertical Navigation',
  thumbnail: Thumbnail,
  attributes: {
    showGrandChildren: {
      title: 'Show grand children?',
    },
  },
  properties: ['showGrandChildren'],
})
