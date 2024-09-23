import { pisaClient } from './pisaClient'
import { DataClassAttributes } from './types'

/**
 * Fetches the schema for `subPath`.
 * Filters out boolean and reference attributes, since they are currently not fully supported.
 **/
export async function filterSchema(subPath: string) {
  const client = await pisaClient(subPath)
  const schema = (await client.get('schema')) as {
    attributes: DataClassAttributes
  }

  return Object.fromEntries(
    Object.entries(schema.attributes).filter(
      ([_, [type]]) => !['boolean', 'reference'].includes(type),
    ),
  )
}
