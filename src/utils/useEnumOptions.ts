import { useAttributeDefinition } from 'scrivito'

export function useEnumOptions(): Array<{ title: string; value: string }> {
  const definition = useAttributeDefinition()

  return definition[0] === 'enum' ? definition[1].values : []
}
