import { sum } from 'lodash-es'
import { ColumnWidgetInstance } from '../ColumnWidget/ColumnWidgetClass'

export function normalizeColSizes(columns: ColumnWidgetInstance[]): number[] {
  if (columns.length === 0) return []
  const weights = columns.map((c) => c.get('colSize') || 1)
  const factor = 12 / sum(weights)

  const floored = weights.map((w) => Math.max(1, Math.floor(w * factor)))
  const remainder = 12 - sum(floored)

  return floored.map((s, i) => (i < remainder ? s + 1 : s))
}
