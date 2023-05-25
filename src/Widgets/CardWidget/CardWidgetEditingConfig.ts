import * as Scrivito from 'scrivito'
import { CardWidget } from './CardWidgetClass'

Scrivito.provideEditingConfig(CardWidget, {
  title: 'Card',
  attributes: {
    image: { title: 'Top image' },
    cardExtended: {
      title: 'Card extended',
      description: 'Only works in column widgets',
    },
  },
  properties: (widget: InstanceType<typeof CardWidget>) => [
    'image',
    'backgroundColor',
    'backgroundImage',
    ['backgroundAnimateOnHover', { enabled: !!widget.get('backgroundImage') }],
    'cardExtended',
    'showFooter',
  ],
  initialContent: {
    backgroundColor: 'transparent',
  },
})
