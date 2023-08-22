import { provideEditingConfig } from 'scrivito'
import { Image } from './ImageObjClass'

provideEditingConfig(Image, {
  title: 'Image',
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
