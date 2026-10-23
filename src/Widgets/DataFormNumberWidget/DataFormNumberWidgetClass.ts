import { provideWidgetClass } from 'scrivito'

export const DataFormNumberWidget = provideWidgetClass('DataFormNumberWidget', {
  attributes: {
    data: 'datalocator',
    design: ['design', { kind: 'text' }],
    helpText: 'html',
    label: 'string',
    maxValue: 'float',
    minValue: 'float',
    placeholder: 'string',
    required: 'boolean',
    stepValue: 'float',
  },
})
