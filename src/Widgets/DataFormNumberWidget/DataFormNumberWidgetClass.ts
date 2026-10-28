import { provideWidgetClass } from 'scrivito'

export const DataFormNumberWidget = provideWidgetClass('DataFormNumberWidget', {
  attributes: {
    data: 'datalocator',
    design: 'design',
    // The field itself, which the widget's design cannot reach: it styles the row.
    fieldDesign: 'design',
    helpText: 'html',
    label: 'string',
    maxValue: 'float',
    minValue: 'float',
    placeholder: 'string',
    required: 'boolean',
    stepValue: 'float',
  },
})
