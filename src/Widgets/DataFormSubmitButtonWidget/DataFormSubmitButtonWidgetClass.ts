import { provideWidgetClass } from 'scrivito'

export const DataFormSubmitButtonWidget = provideWidgetClass(
  'DataFormSubmitButtonWidget',
  {
    attributes: {
      submitTitle: 'string',
      hasReset: 'boolean',
      resetTitle: 'string',
      size: ['enum', { values: ['small', 'medium'] }],
      alignment: ['enum', { values: ['left', 'center', 'right'] }],
    },
  },
)
