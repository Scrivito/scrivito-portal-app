import { provideWidgetClass } from 'scrivito'
import { paddingAttributes } from '../propertiesGroups/padding/paddingAttributes'

export const DataFormSubmitButtonWidget = provideWidgetClass(
  'DataFormSubmitButtonWidget',
  {
    attributes: {
      submitTitle: 'string',
      hasReset: 'boolean',
      resetTitle: 'string',
      size: ['enum', { values: ['small', 'medium', 'large'] }],
      alignment: ['enum', { values: ['left', 'center', 'right', 'block'] }],
      ...paddingAttributes,
    },
  },
)
