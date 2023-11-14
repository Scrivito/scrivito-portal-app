import { provideWidgetClass } from 'scrivito'

export const DataFormNumberWidget = provideWidgetClass('DataFormNumberWidget', {
  attributes: {
    attributeName: 'string',
    placeholder: 'string',
    minValue: 'float',
    maxValue: 'float',
    stepValue: 'float',
    helpText: 'html',
    label: 'string',
    required: 'boolean',
  },
})
