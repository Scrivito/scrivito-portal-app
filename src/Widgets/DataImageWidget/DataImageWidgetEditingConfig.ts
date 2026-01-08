import { provideEditingConfig } from 'scrivito'
import { DataImageWidget } from './DataImageWidgetClass'
import Thumbnail from './thumbnail.svg'
import { ObjectFitEditor } from '../../Components/ScrivitoExtensions/ObjectFitEditor'

provideEditingConfig(DataImageWidget, {
  title: 'Data Image',
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
    data: {
      restrictDataTo: ['itemAttribute'],
    },
    height: {
      title: 'Height',
      editor: 'dimensionPicker',
      options: { units: ['px'] },
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
  },
  properties: (widget) => [
    'alignment',
    'width',
    'height',
    ...(widget.get('height')
      ? ([['objectFit', { component: ObjectFitEditor }]] as const)
      : []),
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
  initialContent: {
    alignment: 'left',
  },
})
