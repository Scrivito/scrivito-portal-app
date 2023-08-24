export function alignmentClassName(widgetAlignment: string | null) {
  if (widgetAlignment === 'center') return 'text-center'
  if (widgetAlignment === 'right') return 'text-end'

  return undefined
}

export function alignmentClassNameWithBlock(
  widgetAlignment: string | null
): string | undefined {
  if (widgetAlignment === 'center') return 'text-center'
  if (widgetAlignment === 'right') return 'text-end'
  if (widgetAlignment === 'block') return 'btn-block'
}
