import { pisaClient } from './pisaClient'
import { DataClassSchema } from './types'

/** Fetches the schema for `subPath`. */
export async function fetchAttributes(
  subPath: string,
): Promise<DataClassSchema> {
  const client = await pisaClient(subPath)
  const schema = (await client.get('schema')) as {
    attributes: DataClassSchema
  }

  return schema.attributes
}
