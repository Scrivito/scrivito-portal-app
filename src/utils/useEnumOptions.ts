import { useAttributeDefinition } from 'scrivito'

// TODO: Remove/trim, once #11238 is resolved
export function useEnumOptions(): Array<{ title: string; value: string }> {
  const attributeDefinition = useAttributeDefinition()

  if (attributeDefinition[0] !== 'enum') return []

  return attributeDefinition[1].values.map((enumValue) => {
    if (isLocalizedEnumValueConfig(enumValue)) return enumValue

    return {
      title: enumValue,
      value: enumValue,
    }
  })
}

function isLocalizedEnumValueConfig(
  value: unknown,
): value is { title: string; value: string } {
  return (
    typeof value === 'object' &&
    value !== null &&
    'title' in value &&
    'value' in value
  )
}
