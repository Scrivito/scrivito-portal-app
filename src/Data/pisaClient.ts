import { createRestApiClient, currentLanguage, load } from 'scrivito'
import { ensureString } from '../utils/ensureString'

export async function pisaUrl(): Promise<string> {
  const url = ensureString(import.meta.env.PISA_URL)
  if (!url) throw new Error('PISA_URL is not set!')

  return url
}

export async function pisaClient(subPath: string) {
  const url = `${await pisaUrl()}/${subPath}`

  const language = await load(() => currentLanguage() ?? 'en')
  const headers = { 'Accept-Language': language }

  return createRestApiClient(url, { headers })
}
