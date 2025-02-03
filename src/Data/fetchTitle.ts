import { pisaClient } from './pisaClient'

export async function fetchTitle(subPath: string): Promise<string | undefined> {
  const client = await pisaClient(subPath)
  if (!client) {
    throw new Error('Please configure a pisaUrl on the default homepage.')
  }

  const schema = (await client.get('schema')) as {
    title?: string
  }

  return schema.title
}
