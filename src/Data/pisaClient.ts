import { createRestApiClient, isUserLoggedIn } from 'scrivito'
import { getJrPlatformPisaSalesApiUrl } from '../privateJrPlatform/getJrPlatformPisaSalesApiUrl'

export async function pisaSalesApiUrl(): Promise<string | null> {
  if (import.meta.env.FORCE_LOCAL_STORAGE) return null

  if (!isUserLoggedIn()) return null

  if (import.meta.env.PRIVATE_JR_PLATFORM) {
    return getJrPlatformPisaSalesApiUrl()
  }

  return import.meta.env.PISA_SALES_API_URL || null
}

export async function pisaClient(subPath: string) {
  const config = await pisaConfig(subPath)
  if (!config) return null

  const { url, headers } = config

  return createRestApiClient(url, { headers })
}

export async function pisaConfig(subPath: string) {
  const baseUrl = await pisaSalesApiUrl()
  if (!baseUrl) return null

  return {
    url: `${baseUrl}/${subPath}`,
    headers: {
      'Accept-Language': 'fr',
    },
  }
}
