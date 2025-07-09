import { provideEditingConfig } from 'scrivito'
import { SpaceWidget } from './SpaceWidgetClass'
import Thumbnail from './thumbnail.svg'

provideEditingConfig(SpaceWidget, {
  title: 'Space',
  thumbnail: Thumbnail,
  attributes: {
    size: {
      title: 'Size',
      description: 'Height of the space. Default: 5',
    },
    unit: {
      title: 'Unit',
      description: 'Unit for the space height. Default: rem',
      values: [
        { value: 'rem', title: 'rem (relative to root font size)' },
        { value: 'vh', title: 'vh (viewport height)' },
      ],
    },
  },
  properties: ['size', 'unit'],
  initialContent: {
    size: 5,
    unit: 'rem',
  },
})
