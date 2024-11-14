import { pisaClient } from './pisaClient'
import { DataClassSchema } from './types'

/**
 * Fetches the schema for `subPath`.
 * Allows optionally to `ignoreAttributes`.
 * */
export async function fetchAttributes(
  subPath: string,
  ignoreAttributes: string[] = [],
): Promise<DataClassSchema> {
  const client = await pisaClient(subPath)
  const schema = (await client.get('schema')) as {
    attributes: DataClassSchema
  }

  return Object.fromEntries(
    Object.entries(schema.attributes).filter(
      ([attributeName]) => !ignoreAttributes.includes(attributeName),
    ),
  )
}
