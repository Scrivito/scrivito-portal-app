import { useAttributeDefinition } from 'scrivito'

// TODO: Remove/trim, once #11238 is resolved
export function useEnumOptions(): Array<{ title: string; value: string }> {
  const attributeDefinition = useAttributeDefinition()

  if (attributeDefinition[0] !== 'enum') return []

  const enumValues = attributeDefinition[1].values
  if (enumValues.every((enumValue) => isLocalizedEnumValueConfig(enumValue))) {
    return enumValues
  }

  if (enumValues.every((enumValue) => typeof enumValue === 'string')) {
    return enumValues.map((flatValue) => ({
      title: flatValue,
      value: flatValue,
    }))
  }

  throw new Error('Invalid enum values')
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
