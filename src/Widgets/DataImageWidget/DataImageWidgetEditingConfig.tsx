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
    link: {
      title: 'Link (optional)',
      description: 'The page to open after clicking the image.',
    },
    roundCorners: {
      title: 'Round corners?',
    },
    data: {
      restrictDataTo: ['itemAttribute'],
    },
  },
  properties: ['alignment', 'link', 'roundCorners'],
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
