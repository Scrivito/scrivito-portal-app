import { provideWidgetClass } from 'scrivito'

export const DataFormBooleanWidget = provideWidgetClass(
  'DataFormBooleanWidget',
  {
    attributes: {
      attributeName: 'string',
      dataForNo: 'string',
      dataForYes: 'string',
      defaultValue: 'boolean',
      helpText: 'html',
      label: 'string',
      required: 'boolean',
      style: ['enum', { values: ['check', 'switch'] }],
      submitOnChange: 'boolean',
    },
  },
)
