import * as Scrivito from 'scrivito'
import { Image } from './ImageObjClass'

Scrivito.provideEditingConfig(Image, {
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
