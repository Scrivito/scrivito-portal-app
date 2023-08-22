export function alignmentClassName(widgetAlignment: string | null) {
  if (widgetAlignment === 'center') return 'text-center'
  if (widgetAlignment === 'right') return 'text-end'

  return undefined
}
