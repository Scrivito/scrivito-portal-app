import { Widget } from 'scrivito'
import { isAttributeNameUnique } from '../isAttributeNameUnique'

export const attributeNameValidation = [
  'attributeName',

  (attributeName: unknown, { widget }: { widget: Widget }) => {
    if (typeof attributeName !== 'string') return

    if (!isAttributeNameUnique(widget)) {
      return 'Specify a unique attribute name. There is at least one other element with the same attribute name.'
    }
  },
] as const
