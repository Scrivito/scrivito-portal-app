import { provideEditingConfig } from 'scrivito'
import { CardWidget } from './CardWidgetClass'
import { classNameToThumbnail } from '../../utils/classNameToThumbnail'

provideEditingConfig(CardWidget, {
  title: 'Card',
  thumbnail: classNameToThumbnail('CardWidget'),
  attributes: {
    image: { title: 'Top image' },
    cardExtended: {
      title: 'Card extended',
      description: 'Only works in column widgets',
    },
    padding: {
      title: 'Padding',
      description: 'Inner space. Default: "p-4"',
    },
    margin: {
      title: 'Margin',
      description: 'Outer space to next item (bottom). Default: "mb-4"',
    },
  },
  properties: (widget: InstanceType<typeof CardWidget>) => [
    'linkTo',
    'image',
    'backgroundColor',
    'backgroundImage',
    ['backgroundAnimateOnHover', { enabled: !!widget.get('backgroundImage') }],
    'cardExtended',
    'padding',
    'margin',
    'showFooter',
  ],
  initialContent: {
    backgroundColor: 'transparent',
    margin: 'mb-4',
    padding: 'p-4',
  },
})
