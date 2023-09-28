import { provideEditingConfig } from 'scrivito'
import { ProductParameterWidget } from './ProductParameterWidgetClass'
import { classNameToThumbnail } from '../../utils/classNameToThumbnail'

provideEditingConfig(ProductParameterWidget, {
  title: 'Product parameter',
  thumbnail: classNameToThumbnail('ProductParameterWidget'),
  properties: ['parameter', 'values'],
  titleForContent: (widget) =>
    `${widget.get('parameter')}: ${widget.get('values').join(', ')}`,
  validations: [
    [
      'parameter',
      (parameter: string) => {
        if (!parameter) return 'Specify a parameter (e.g. "Color").'
      },
    ],
    [
      'values',
      (values: string) => {
        if (!values) return 'Specify values (e.g. "red").'
      },
    ],
  ],
  initialContent: {
    parameter: 'Color',
    values: ['red'],
  },
})
