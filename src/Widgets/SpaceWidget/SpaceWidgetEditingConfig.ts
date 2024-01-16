import { provideEditingConfig } from 'scrivito'
import { SpaceWidget } from './SpaceWidgetClass'
import Thumbnail from './thumbnail.svg'

provideEditingConfig(SpaceWidget, {
  title: 'Space',
  thumbnail: Thumbnail,
  attributes: {
    size: {
      title: 'Choose size',
      description: 'Height of the space in rem. Default: 5',
    },
  },
  properties: ['size'],
  initialContent: {
    size: 5,
  },
})
