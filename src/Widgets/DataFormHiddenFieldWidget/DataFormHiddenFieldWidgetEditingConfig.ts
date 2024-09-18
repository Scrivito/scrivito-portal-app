import { provideEditingConfig, Widget } from 'scrivito'
import { DataFormHiddenFieldWidget } from './DataFormHiddenFieldWidgetClass'
import Thumbnail from './thumbnail.svg'

provideEditingConfig(DataFormHiddenFieldWidget, {
  title: 'Hidden Data Form Field',
  thumbnail: Thumbnail,
  attributes: {
    attributeName: { title: 'Attribute name' },
    data: {
      restrictDataTo: ['scopeAttribute', 'itemAttribute'],
    },
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
      // @ts-expect-error until out of private beta
      widget.get('data').field(),
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
