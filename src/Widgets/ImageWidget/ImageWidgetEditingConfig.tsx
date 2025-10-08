import { provideEditingConfig, Widget } from 'scrivito'
import { ImageWidget } from './ImageWidgetClass'
import Thumbnail from './thumbnail.svg'
import { AttributeDimensionEditor } from '../../Components/ScrivitoExtensions/AttributeDimensionEditor'

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
    height: {
      title: 'Height',
    },
    imageFromDataItem: {
      title: 'Show image from data item?',
    },
    link: {
      title: 'Link (optional)',
      description: 'The page to open after clicking the image.',
    },
    objectFit: {
      title: 'Object fit',
      description: 'Default: Contain',
    },
    roundCorners: {
      title: 'Round corners?',
    },
    width: {
      title: 'Width',
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
      properties: [
        [
          'height',
          {
            component: ({ widget }: { widget?: Widget }) => (
              <AttributeDimensionEditor
                widget={widget}
                attribute="height"
                units={['px']}
              />
            ),
          },
        ],
        'objectFit', // TODO: Add custom editor here
        [
          'width',
          {
            component: ({ widget }: { widget?: Widget }) => (
              <AttributeDimensionEditor
                widget={widget}
                attribute="width"
                units={['px', '%']}
              />
            ),
          },
        ],
      ],
      key: 'dimensions-group',
    },
  ],
  initialContent: {
    alignment: 'left',
  },
})
