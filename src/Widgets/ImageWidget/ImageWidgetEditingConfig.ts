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
    height: {
      title: 'Height',
      editor: 'dimensionPicker',
      options: { units: ['px'] },
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
    width: {
      title: 'Width',
      editor: 'dimensionPicker',
      options: { units: ['px', '%'] },
    },
  },
  properties: (widget) => [
    'alignment',
    'width',
    'height',
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
      title: 'Object fit',
      properties: ['objectFit'],
      component: ImageDimensionsEditor,
      key: 'object-fit-group',
    },
  ],
  initialContent: {
    alignment: 'left',
  },
})
