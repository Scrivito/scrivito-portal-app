import { provideEditingConfig } from 'scrivito'
import thumbnail from './thumbnail.svg'
import { TickListItemWidget } from './TickListItemWidgetClass'
import {
  textStyleEditingConfigAttributes,
  textStylePropertiesGroup,
} from '../textStyleEditingConfig'

provideEditingConfig(TickListItemWidget, {
  title: 'Tick List Item',
  thumbnail,
  attributes: {
    ...textStyleEditingConfigAttributes,
  },
  propertiesGroups: [textStylePropertiesGroup],
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
