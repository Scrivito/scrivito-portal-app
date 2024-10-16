import { provideEditingConfig } from 'scrivito'
import thumbnail from './thumbnail.svg'
import { TickListItemWidget } from './TickListItemWidgetClass'

provideEditingConfig(TickListItemWidget, {
  title: 'Tick List Item',
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
    statement: 'A statement',
  },
  validations: [
    [
      'statement',

      (statement) => {
        if (!statement) {
          return {
            message: 'The statement should be set.',
            severity: 'warning',
          }
        }
      },
    ],
  ],
})
