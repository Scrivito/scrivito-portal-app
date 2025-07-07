import { DataAttributeDefinitions } from 'scrivito'
import { pisaClient } from './pisaClient'

export async function fetchSchema(subPath: string): Promise<{
  attributes: DataAttributeDefinitions
  title?: string
}> {
  const client = await pisaClient(subPath)
  if (!client) {
    throw new Error('Please configure "PisaSales API URL" for your account.')
  }

  return client.get('schema') as Promise<{
    attributes: DataAttributeDefinitions
    title?: string
  }>
}
