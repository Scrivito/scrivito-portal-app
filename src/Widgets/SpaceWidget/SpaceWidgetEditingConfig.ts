import { provideEditingConfig } from 'scrivito'
import { SpaceWidget } from './SpaceWidgetClass'
import { classNameToThumbnail } from '../../utils/classNameToThumbnail'

provideEditingConfig(SpaceWidget, {
  title: 'Space',
  thumbnail: classNameToThumbnail('SpaceWidget'),
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
