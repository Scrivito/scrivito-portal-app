import * as Scrivito from 'scrivito'
import { ImageWidget } from './ImageWidgetClass'

Scrivito.provideEditingConfig(ImageWidget, {
  title: 'Image',
  attributes: {
    alternativeText: {
      title: 'Alternative text (optional)',
      description:
        'Brief description of what the image is about.' +
        ' If empty, the alternative text of the image is used.',
    },
    link: {
      title: 'Link (optional)',
      description: 'The page to open after clicking the image.',
    },
  },
  properties: ['alternativeText', 'link'],
  validations: [
    [
      'image',

      (image) => {
        if (!image) {
          return {
            message: 'The image should be set.',
            severity: 'warning',
          }
        }
      },
    ],
  ],
})
