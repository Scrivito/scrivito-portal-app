import { provideEditingConfig } from 'scrivito'
import { ImageWidget } from './ImageWidgetClass'
import Thumbnail from './thumbnail.svg'

provideEditingConfig(ImageWidget, {
  title: 'Image',
  thumbnail: Thumbnail,
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
    attributeName: {
      title: 'Data item attribute name',
    },
    imageFromDataItem: {
      title: 'Show image from data item?',
    },
    link: {
      title: 'Link (optional)',
      description: 'The page to open after clicking the image.',
    },
    roundCorners: {
      title: 'Round corners?',
    },
  },
  properties: (widget) => [
    'alignment',
    'alternativeText',
    'link',
    'roundCorners',
    'imageFromDataItem',
    ['attributeName', { enabled: widget.get('imageFromDataItem') }],
  ],
  initialContent: {
    alignment: 'left',
  },
  validations: [
    [
      'image',

      (image, { widget }) => {
        if (!widget.get('imageFromDataItem') && !image) {
          return {
            message: 'The image should be set.',
            severity: 'warning',
          }
        }
      },
    ],
  ],
})
