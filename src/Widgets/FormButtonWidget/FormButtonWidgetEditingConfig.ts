import { provideEditingConfig } from 'scrivito'
import { insideFormContainerValidation } from '../FormContainerWidget/utils/validations/insideFormContainerValidation'
import { FormButtonWidget } from './FormButtonWidgetClass'

provideEditingConfig(FormButtonWidget, {
  title: 'Form Button',
  attributes: {
    buttonText: {
      title: 'Button Text',
    },
    alignment: {
      title: 'Alignment',
      values: [
        { value: 'left', title: 'Left' },
        { value: 'center', title: 'Center' },
        { value: 'right', title: 'Right' },
        { value: 'block', title: 'Full width' },
      ],
    },
  },
  properties: ['buttonText', 'alignment'],
  initialContent: {
    buttonText: 'send message',
    alignment: 'center',
  },
  validations: [
    insideFormContainerValidation,
    [
      'alignment',
      (alignment) => {
        if (!alignment) return 'Select the alignment.'
      },
    ],
  ],
})
