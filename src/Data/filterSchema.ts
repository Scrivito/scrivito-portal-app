import { pisaClient } from './pisaClient'
import { DataClassAttributes } from './types'

/**
 * Fetches the schema for `subPath`.
 * Filters out boolean and reference attributes, since they are currently not fully supported.
 * It also converts enum values, if in a wrong format.
 **/
export async function filterSchema(subPath: string) {
  const client = await pisaClient(subPath)
  const schema = (await client.get('schema')) as {
    attributes: DataClassAttributes
  }

  return Object.fromEntries(
    Object.entries(schema.attributes)
      .filter(
        ([_, attribute]) => !['boolean', 'reference'].includes(attribute[0]),
      )
      .map(([key, value]) => [
        key,
        value[0] === 'enum'
          ? ['enum', correctWrongEnumValues(value[1])]
          : value,
      ]),
  )
}

type LocalizedEnumValueConfig = {
  value: string
  title: string
}

type EnumValueConfig = string | LocalizedEnumValueConfig

function correctWrongEnumValues({
  values,
  title,
}: {
  values: EnumValueConfig[]
  title?: string
}): {
  values: LocalizedEnumValueConfig[]
  title?: string
} {
  return {
    values: values.map((value) =>
      typeof value === 'string' ? { value, title: value } : value,
    ),
    title,
  }
}
