import { provideWidgetClass } from 'scrivito'

export const DataFormNumberWidget = provideWidgetClass('DataFormNumberWidget', {
  attributes: {
    attributeName: 'string',
    data: 'datalocator',
    helpText: 'html',
    label: 'string',
    maxValue: 'float',
    minValue: 'float',
    placeholder: 'string',
    required: 'boolean',
    stepValue: 'float',
  },
})
