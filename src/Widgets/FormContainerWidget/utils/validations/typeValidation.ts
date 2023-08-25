import { Widget } from 'scrivito'
import { isCustomType } from '../isCustomType'
import { isFieldNameUnique } from '../isFieldNameUnique'

export const typeValidation = [
  'type',
  (type: unknown, { widget }: { widget: Widget }) => {
    if (!type || typeof type !== 'string') return 'Select the input type.'

    if (!isCustomType(widget) && !isFieldNameUnique(widget)) {
      return `There must be only one element with the input type “${type.replace(
        /_/,
        ' ',
      )}”.`
    }
  },
] as const
