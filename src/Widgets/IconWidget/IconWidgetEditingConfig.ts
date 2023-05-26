import * as Scrivito from 'scrivito'
import { IconWidget } from './IconWidgetClass'

Scrivito.provideEditingConfig(IconWidget, {
  title: 'Icon',
  attributes: {
    size: {
      title: 'Size',
    },
    alignment: {
      title: 'Alignment',
      description: 'A icon list widget ignores this setting. Default: Left',
      values: [
        { value: 'left', title: 'Left' },
        { value: 'center', title: 'Center' },
        { value: 'right', title: 'Right' },
      ],
    },
    link: {
      title: 'Link (optional)',
      description: 'The link where this icon should lead.',
    },
  },
  properties: ['icon', 'size', 'alignment', 'link'],
  initialContent: {
    icon: 'bi-box',
    size: 'bi-1x',
    alignment: 'left',
  },
})
