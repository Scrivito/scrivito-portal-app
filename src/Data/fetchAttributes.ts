import { DataAttributeDefinitions } from 'scrivito'
import { pisaClient } from './pisaClient'

export async function fetchAttributes(
  subPath: string,
  ignoreAttributes: string[] = [],
): Promise<DataAttributeDefinitions> {
  const client = await pisaClient(subPath)
  if (!client) {
    throw new Error('Please configure a pisaUrl on the default homepage.')
  }

  const schema = (await client.get('schema')) as {
    attributes: DataAttributeDefinitions
  }

  return Object.fromEntries(
    Object.entries(schema.attributes).filter(
      ([attributeName]) => !ignoreAttributes.includes(attributeName),
    ),
  )
}
