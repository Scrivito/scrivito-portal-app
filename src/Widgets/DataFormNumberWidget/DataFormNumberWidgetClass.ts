import { provideWidgetClass } from 'scrivito'

export const DataFormNumberWidget = provideWidgetClass('DataFormNumberWidget', {
  attributes: {
    attributeName: 'string',
    placeholder: 'string',
    minValue: 'integer',
    maxValue: 'integer',
    stepValue: 'float',
    helpText: 'html',
    label: 'string',
    required: 'boolean',
  },
})
