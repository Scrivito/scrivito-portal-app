import { provideEditingConfig } from 'scrivito'
import { Image } from './ImageObjClass'
import { classNameToThumbnail } from '../../utils/classNameToThumbnail'

provideEditingConfig(Image, {
  title: 'Image',
  thumbnail: classNameToThumbnail('Image'),
  attributes: {
    alternativeText: {
      title: 'Alternative text',
      description: 'Brief description of what the image is about.',
    },
    tags: {
      title: 'Tags',
      description: 'Make it easier to find this Image by adding some tags.',
    },
  },
  properties: ['alternativeText', 'tags'],
})
