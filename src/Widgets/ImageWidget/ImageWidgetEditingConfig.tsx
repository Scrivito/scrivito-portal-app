import { provideEditingConfig } from 'scrivito'
import { ImageWidget } from './ImageWidgetClass'
import Thumbnail from './thumbnail.svg'
import { ImageDimensionsEditor } from '../../Components/ScrivitoExtensions/ImageDimensionsEditor'

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
        'Text that helps visually impaired users understand the purpose or function of the image.' +
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
    [
      'roundCorners',
      {
        enabled:
          (widget.obj().ancestors()[0] || widget.obj()).get(
            'siteBorderRadius',
          ) !== '0px',
      },
    ],
  ],
  propertiesGroups: [
    {
      title: 'Dimensions',
      properties: ['height', 'objectFit', 'width'],
      component: ImageDimensionsEditor,
      key: 'dimensions-group',
    },
  ],
  initialContent: {
    alignment: 'left',
  },
})
