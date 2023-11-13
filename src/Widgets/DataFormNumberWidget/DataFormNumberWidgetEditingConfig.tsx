import { provideEditingConfig } from 'scrivito'
import { classNameToThumbnail } from '../../utils/classNameToThumbnail'
import { DataFormNumberWidget } from './DataFormNumberWidgetClass'

provideEditingConfig(DataFormNumberWidget, {
  title: 'Data Form Number',
  thumbnail: classNameToThumbnail('DataFormNumberWidget'),
  attributes: {
    attributeName: {
      title: 'Name of the data attribute in question',
    },
    required: { title: 'Mandatory' },
    helpText: { title: 'Help text' },
    minValue: { title: 'Minimum value' },
    maxValue: { title: 'Maximum value' },
    stepValue: {
      title: 'Step value',
      description:
        "Granularity of up and down buttons. Use '1' for integer input. To allow decimal entries, change this value; e.g. a value of '0.01' supports inputs with up to two decimal places.",
    },
  },
  properties: [
    'attributeName',
    'label',
    'placeholder',
    'required',
    'minValue',
    'maxValue',
    'stepValue',
    'helpText',
    'defaultValue',
  ],
  initialContent: {
    label: 'Custom field',
    stepValue: 1.0,
  },
})
