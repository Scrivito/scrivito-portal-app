import { provideEditingConfig, Widget } from 'scrivito'
import { customFieldNameValidation } from '../FormContainerWidget/utils/validations/customFieldNameValidation'
import { FormHiddenFieldWidget } from './FormHiddenFieldWidgetClass'
import Thumbnail from './thumbnail.svg'

provideEditingConfig(FormHiddenFieldWidget, {
  title: 'Hidden Form Field',
  thumbnail: Thumbnail,
  attributes: {
    customFieldName: { title: 'Field name' },
    hiddenValue: {
      title: 'Hidden value',
      description: 'This value is sent on every submission of the form.',
    },
  },
  properties: ['customFieldName', 'hiddenValue'],
  initialContent: {
    customFieldName: 'custom_hidden_field',
  },
  validations: [
    customFieldNameValidation,
    (widget) => {
      const hiddenFields = widget.container().get('hiddenFields')
      if (
        !isWidgetArray(hiddenFields) ||
        hiddenFields
          .map((hiddenField) => hiddenField.id())
          .includes(widget.id())
      ) {
        return
      }

      return {
        message: 'Hidden fields should be added in the properties of the form.',
        severity: 'info',
      }
    },
  ],
  titleForContent: (widget) =>
    `Hidden Form Field: ${[
      widget.get('customFieldName'),
      widget.get('hiddenValue'),
    ]
      .filter((e) => e)
      .join(' - ')}`,
})

function isWidgetArray(variable: unknown): variable is Widget[] {
  return (
    Array.isArray(variable) && variable.every((item) => item instanceof Widget)
  )
}
