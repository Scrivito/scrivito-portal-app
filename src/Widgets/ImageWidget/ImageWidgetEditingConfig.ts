import { Obj, provideEditingConfig } from 'scrivito'
import { ImageWidget } from './ImageWidgetClass'
import Thumbnail from './thumbnail.svg'
import { ObjectFitEditor } from '../../Components/ScrivitoExtensions/ObjectFitEditor'
import {
  paddingEditAttributes,
  paddingGroup,
} from '../propertiesGroups/padding/paddingEditingConfig'

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
    objectFit: {
      title: 'Object fit',
      description: 'Default: Contain',
    },
    roundCorners: {
      title: 'Round corners?',
    },
    width: {
      title: 'Width',
      editor: 'dimensionPicker',
      options: { units: ['px', '%'] },
    },
    ...paddingEditAttributes,
  },
  properties: (widget) => [
    'alignment',
    'width',
    'height',
    ...(widget.get('height')
      ? ([['objectFit', { component: ObjectFitEditor }]] as const)
      : []),
    'alternativeText',
    'link',
    [
      'roundCorners',
      {
        enabled: siteHasBorderRadius(widget.obj()),
      },
    ],
  ],
  propertiesGroups: [paddingGroup],
  initialContent: {
    alignment: 'left',
  },
})

function siteHasBorderRadius(obj: Obj): boolean {
  return (obj.ancestors()[0] || obj).get('siteBorderRadius') !== '0px'
}
