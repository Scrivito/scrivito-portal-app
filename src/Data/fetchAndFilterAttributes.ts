import { pisaClient } from './pisaClient'
import { DataClassAttributes, DataClassSchema } from './types'

/**
 * Fetches the schema for `subPath`.
 * Filters out reference attributes, since they are currently not fully supported.
 **/
export async function fetchAndFilterAttributes(
  subPath: string,
): Promise<DataClassSchema> {
  const client = await pisaClient(subPath)
  const schema = (await client.get('schema')) as {
    attributes: DataClassAttributes
  }

  return Object.fromEntries(
    Object.entries(schema.attributes).filter(
      ([_, [type]]) => type !== 'reference',
    ),
  )
}
