import { provideEditingConfig, Widget } from 'scrivito'
import { DataImageWidget } from './DataImageWidgetClass'
import Thumbnail from './thumbnail.svg'
import { AttributeDimensionEditor } from '../../Components/ScrivitoExtensions/AttributeDimensionEditor'
import { ObjectFit } from '../../Components/ScrivitoExtensions/ObjectFitEditor'

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
    height: {
      title: 'Height',
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
    data: {
      restrictDataTo: ['itemAttribute'],
    },
  },
  properties: ['alignment', 'link', 'roundCorners'],
  propertiesGroups: (widget) => [
    {
      title: 'Dimensions',
      properties: [
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
        ...(widget.get('width')
          ? ([['objectFit', { component: ObjectFit }]] as const)
          : []),
      ],
      key: 'dimensions-group',
    },
  ],
  initialContent: {
    alignment: 'left',
  },
})
