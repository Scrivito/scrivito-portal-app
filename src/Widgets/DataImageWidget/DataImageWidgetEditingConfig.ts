import { provideEditingConfig } from 'scrivito'
import { DataImageWidget } from './DataImageWidgetClass'
import Thumbnail from './thumbnail.svg'

provideEditingConfig(DataImageWidget, {
  title: 'Data Image',
  thumbnail: Thumbnail,
  attributes: {
    // The design goes on the `<img>` itself, which is what `objectFit` needs.
    design: { kind: 'replaced' },
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
    link: {
      title: 'Link (optional)',
      description: 'The page to open after clicking the image.',
    },
  },
  properties: ['alignment', 'link'],
  initialContent: {
    alignment: 'left',
  },
})
