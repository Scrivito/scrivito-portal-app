import { provideEditingConfig, Widget } from 'scrivito'
import { customFieldNameValidation } from '../FormContainerWidget/utils/validations/customFieldNameValidation'
import { FormHiddenFieldWidget } from './FormHiddenFieldWidgetClass'
import Thumbnail from './thumbnail.svg'
import { isCustomType } from '../FormContainerWidget/utils/isCustomType'
import { getFieldName } from '../FormContainerWidget/utils/getFieldName'

provideEditingConfig(FormHiddenFieldWidget, {
  title: 'Hidden Form Field',
  thumbnail: Thumbnail,
  attributes: {
    customFieldName: { title: 'Field name' },
    hiddenValue: {
      title: 'Hidden value',
      description: 'This value is sent on every submission of the form.',
    },
    type: {
      title: 'Input type',
      values: [
        { value: 'custom', title: 'Custom' },
        { value: 'subscription', title: 'Subscription' },
      ],
    },
  },
  properties: (widget) =>
    isCustomType(widget)
      ? ['type', 'customFieldName', 'hiddenValue']
      : ['type', 'hiddenValue'],
  initialContent: {
    customFieldName: 'custom_hidden_field',
    type: 'custom',
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
    [
      'hiddenValue',
      (hiddenValue: string, { widget }) => {
        const fieldName = getFieldName(widget)

        if (fieldName === 'subscription' && hiddenValue !== 'on') {
          return {
            message:
              "Please enter 'on' to activate the subscription process on every submission.",
            severity: 'warning',
          }
        }
      },
    ],
  ],
  titleForContent: (widget) =>
    `Hidden Form Field: ${[getFieldName(widget), widget.get('hiddenValue')]
      .filter((e) => e)
      .join(' - ')}`,
})

function isWidgetArray(variable: unknown): variable is Widget[] {
  return (
    Array.isArray(variable) && variable.every((item) => item instanceof Widget)
  )
}
