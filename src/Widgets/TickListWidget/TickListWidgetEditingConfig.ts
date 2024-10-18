import thumbnail from './thumbnail.svg'
import { TickListItemWidget } from '../TickListItemWidget/TickListItemWidgetClass'
import { provideEditingConfig } from 'scrivito'

provideEditingConfig('TickListWidget', {
  title: 'Tick List',
  thumbnail,
  attributes: {
    icon: {
      title: 'Icon',
      description:
        'Default: "bi-check". The full list of names can be found at https://icons.getbootstrap.com/',
    },
  },
  properties: ['icon'],
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
