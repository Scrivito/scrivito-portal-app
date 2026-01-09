import thumbnail from './thumbnail.svg'
import { TickListItemWidget } from '../TickListItemWidget/TickListItemWidgetClass'
import { provideEditingConfig, Widget } from 'scrivito'
import { ScrivitoBootstrapIconPicker } from '../../Components/ScrivitoExtensions/ScrivitoBootstrapIconPicker'
import { TickListWidget } from './TickListWidgetClass'

provideEditingConfig(TickListWidget, {
  title: 'Tick List',
  thumbnail,
  properties: [
    [
      'icon',
      {
        component: ({ widget }: { widget: Widget }) => (
          <ScrivitoBootstrapIconPicker
            attribute="icon"
            defaultValue="check"
            widget={widget}
          />
        ),
      },
    ],
  ],
  initialContent: {
    icon: 'bi-check',
    items: [
      new TickListItemWidget({}),
      new TickListItemWidget({}),
      new TickListItemWidget({}),
    ],
  },
  validations: [
    [
      'items',

      (items) => {
        if (Array.isArray(items) && items.length < 1) {
          return {
            message: 'The tick list must include at least one item.',
            severity: 'error',
          }
        }
      },
    ],
  ],
})
