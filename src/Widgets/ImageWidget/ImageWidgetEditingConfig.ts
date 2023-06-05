import * as Scrivito from 'scrivito'
import { ImageWidget } from './ImageWidgetClass'

Scrivito.provideEditingConfig(ImageWidget, {
  title: 'Image',
  attributes: {
    alignment: {
      title: 'Alignment',
      description: 'Default: Left',
      values: [
        { value: 'left', title: 'Left' },
        { value: 'center', title: 'Center' },
        { value: 'right', title: 'Right' },
      ],
    },
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
  properties: ['alignment', 'alternativeText', 'link'],
  initialContent: {
    alignment: 'left',
  },
  validations: [
    [
      'image',

      // TODO: Remove explicit type of image, once #9955 is resolved
      (image: Scrivito.Obj | null) => {
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
