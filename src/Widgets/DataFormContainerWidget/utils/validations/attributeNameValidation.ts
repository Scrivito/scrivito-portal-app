import { Widget } from 'scrivito'
import { isAttributeNameUnique } from '../isAttributeNameUnique'

export const attributeNameValidation = [
  'attributeName',

  (attributeName: unknown, { widget }: { widget: Widget }) => {
    if (typeof attributeName !== 'string') return

    if (attributeName.match(/^[A-Za-z_][A-Za-z0-9_]*$/) === null) {
      return 'Attribute names may consist of the following characters: "a-z", "A-Z", "0-9", "_".'
    }

    if (attributeName.length > 50) {
      return `Attribute names may be up to 50 characters long. This name is ${attributeName.length} characters long.`
    }

    if (!isAttributeNameUnique(widget)) {
      return 'Specify a unique attribute name. There is at least one other element with the same attribute name.'
    }
  },
] as const
