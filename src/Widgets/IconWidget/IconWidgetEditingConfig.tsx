import { provideEditingConfig, Widget } from 'scrivito'
import { IconWidget } from './IconWidgetClass'
import Thumbnail from './thumbnail.svg'
import { ScrivitoBootstrapIconEditor } from 'scrivito-icon-editor'

provideEditingConfig(IconWidget, {
  title: 'Icon',
  thumbnail: Thumbnail,
  attributes: {
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
    size: {
      title: 'Size',
      description: 'Default: 150%',
      values: [
        { value: 'bi-1x', title: '100%' },
        { value: 'bi-2x', title: '150%' },
        { value: 'bi-3x', title: '200%' },
        { value: 'bi-4x', title: '250%' },
        { value: 'bi-5x', title: '300%' },
      ],
    },
  },
  properties: [
    [
      'icon',
      {
        component: ({ widget }: { widget: Widget }) => (
          <ScrivitoBootstrapIconEditor
            attribute="icon"
            defaultValue="box"
            widget={widget}
          />
        ),
      },
    ],
    'size',
    'alignment',
    'link',
  ],
  initialContent: {
    icon: 'bi-box',
    size: 'bi-2x',
    alignment: 'left',
  },
})
