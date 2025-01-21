import { DataAttributeDefinitions } from 'scrivito'
import { pisaClient } from './pisaClient'

/**
 * Fetches the schema for `subPath`.
 * Allows optionally to `ignoreAttributes`.
 * */
export async function fetchAttributes(
  subPath: string,
  ignoreAttributes: string[] = [],
): Promise<DataAttributeDefinitions> {
  const client = await pisaClient(subPath)
  const schema = (await client.get('schema')) as {
    attributes: DataAttributeDefinitions
  }

  return Object.fromEntries(
    Object.entries(schema.attributes).filter(
      ([attributeName]) => !ignoreAttributes.includes(attributeName),
    ),
  )
}
