import * as Scrivito from 'scrivito'
import { CardWidget } from './CardWidgetClass'

Scrivito.provideEditingConfig(CardWidget, {
  title: 'Card',
  attributes: {
    image: { title: 'Top image' },
  },
  properties: (widget: InstanceType<typeof CardWidget>) => [
    'image',
    'backgroundColor',
    'backgroundImage',
    ['backgroundAnimateOnHover', { enabled: !!widget.get('backgroundImage') }],
    'showFooter',
  ],
  initialContent: {
    backgroundColor: 'transparent',
  },
})
