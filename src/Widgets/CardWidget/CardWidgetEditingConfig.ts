import { provideEditingConfig } from 'scrivito'
import { CardWidget } from './CardWidgetClass'
import Thumbnail from './thumbnail.svg'

provideEditingConfig(CardWidget, {
  title: 'Card',
  thumbnail: Thumbnail,
  attributes: {
    backgroundAnimateOnHover: {
      title: 'Animate background on hover?',
      description: 'Default: No',
    },
    backgroundImage: {
      title: 'Background image or video',
    },
    image: { title: 'Top image' },
    cardExtended: {
      title: 'Card extended',
      description: 'Only works in column widgets',
    },
  },
  properties: [
    'linkTo',
    'image',
    'cardExtended',
    'showFooter',
    'backgroundImage',
    'backgroundAnimateOnHover',
  ],
})
