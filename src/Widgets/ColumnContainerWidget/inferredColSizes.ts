import { ColumnWidgetInstance } from '../ColumnWidget/ColumnWidgetClass'

export function inferredColSizes(columns: ColumnWidgetInstance[]): number[] {
  const setColumns = columns.filter((col) => col.get('colSize'))
  if (setColumns.length === columns.length) {
    return columns.map((col) => col.get('colSize')!)
  }
  const unsetColumnsCount = columns.length - setColumns.length

  const usedSpace = setColumns.reduce(
    (sum, col) => sum + col.get('colSize')!,
    0,
  )
  const remainingSpace = Math.max(12 - usedSpace, 0)

  const base = Math.floor(remainingSpace / unsetColumnsCount)
  const extraColumnsCount = remainingSpace - base * unsetColumnsCount

  // Distribute remaining space: first N unset columns get base+1, rest get base
  let unsetColumnsProcessed = 0
  return columns.map((col) => {
    const explicitSize = col.get('colSize')
    if (explicitSize) return explicitSize

    const extra = unsetColumnsProcessed < extraColumnsCount ? 1 : 0
    unsetColumnsProcessed++
    return base + extra
  })
}
