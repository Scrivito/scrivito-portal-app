import { DataAttributeDefinitions } from 'scrivito'
import { pisaClient } from './pisaClient'

export async function fetchAttributes(
  subPath: string,
): Promise<DataAttributeDefinitions> {
  const client = await pisaClient(subPath)
  if (!client) {
    throw new Error('Please configure a pisaUrl on the default homepage.')
  }

  const { attributes } = (await client.get('schema')) as {
    attributes: DataAttributeDefinitions
  }

  return attributes
}
