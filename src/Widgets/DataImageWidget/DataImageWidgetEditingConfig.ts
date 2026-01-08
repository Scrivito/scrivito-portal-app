import { provideEditingConfig } from 'scrivito'
import { DataImageWidget } from './DataImageWidgetClass'
import Thumbnail from './thumbnail.svg'
import { ImageDimensionsEditor } from '../../Components/ScrivitoExtensions/ImageDimensionsEditor'

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
    roundCorners: {
      title: 'Round corners?',
    },
    width: {
      title: 'Width',
      editor: 'dimensionPicker',
      options: { units: ['px', '%'] },
    },
  },
  properties: ['alignment', 'width', 'height', 'link', 'roundCorners'],
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
