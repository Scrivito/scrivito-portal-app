import { Design, provideEditingConfig } from 'scrivito'
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
  properties: ['linkTo', 'image', 'cardExtended', 'showFooter'],
  initialContent: {
    // What `mb-4` and `p-4` used to render.
    design: new Design({
      desktop: {
        marginBottom: '1.5rem',
        paddingTop: '1.5rem',
        paddingRight: '1.5rem',
        paddingBottom: '1.5rem',
        paddingLeft: '1.5rem',
      },
    }),
  },
})
