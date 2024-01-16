import { provideEditingConfig, Widget } from 'scrivito'
import { attributeNameValidation } from '../DataFormContainerWidget/utils/validations/attributeNameValidation'
import { DataFormHiddenFieldWidget } from './DataFormHiddenFieldWidgetClass'
import Thumbnail from './thumbnail.svg'

provideEditingConfig(DataFormHiddenFieldWidget, {
  title: 'Hidden Data Form Field',
  thumbnail: Thumbnail,
  attributes: {
    attributeName: { title: 'Attribute name' },
    hiddenValue: {
      title: 'Hidden value',
      description: 'This value is sent on every submission of the data form.',
    },
  },
  properties: ['attributeName', 'hiddenValue'],
  initialContent: {
    attributeName: 'hidden_field',
  },
  validations: [
    attributeNameValidation,
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
        message:
          'Hidden fields should be added in the properties of the data form.',
        severity: 'info',
      }
    },
  ],
  titleForContent: (widget) =>
    `Hidden Data Form Field: ${[
      widget.get('attributeName'),
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
