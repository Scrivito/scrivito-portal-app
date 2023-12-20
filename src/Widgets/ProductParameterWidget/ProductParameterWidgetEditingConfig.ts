import { provideEditingConfig } from 'scrivito'
import { ProductParameterWidget } from './ProductParameterWidgetClass'
import Thumbnail from './thumbnail.svg'

provideEditingConfig(ProductParameterWidget, {
  title: 'Product Parameter',
  thumbnail: Thumbnail,
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
