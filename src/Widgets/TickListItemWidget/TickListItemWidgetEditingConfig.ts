import { provideEditingConfig } from 'scrivito'
import thumbnail from './thumbnail.svg'
import { TickListItemWidget } from './TickListItemWidgetClass'

provideEditingConfig(TickListItemWidget, {
  title: 'Tick List Item',
  thumbnail,
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
