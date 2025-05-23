import {
  Obj,
  createRestApiClient,
  currentLanguage,
  currentUser,
  load,
} from 'scrivito'
import { isHomepage } from '../Objs/Homepage/HomepageObjClass'

async function pisaBaseUrl(): Promise<string | null> {
  if (import.meta.env.FORCE_LOCAL_STORAGE) return null
  if (!(await load(() => currentUser()))) return null

  // TODO: Read out `pisa_sales_api_url` from AMS instance configuration once available
  const defaultRoot = await load(() =>
    Obj.onAllSites().get(import.meta.env.SCRIVITO_ROOT_OBJ_ID),
  )
  if (!isHomepage(defaultRoot)) return never()

  const pisaUrl = defaultRoot.get('pisaUrl')
  if (!pisaUrl) return null

  return pisaUrl.replace(/\/portal$/, '')
}

export async function pisaUrl(): Promise<string | null> {
  const baseUrl = await pisaBaseUrl()
  if (!baseUrl) return null

  return `${baseUrl}/portal`
}

export async function pisaClient(subPath: string) {
  const config = await pisaConfig(subPath)
  if (!config) return null

  const { url, headers } = config

  return createRestApiClient(url, { headers })
}

export async function pisaConfig(subPath: string) {
  const baseUrl = await pisaUrl()
  if (!baseUrl) return null

  return {
    url: `${baseUrl}/${subPath}`,
    headers: {
      'Accept-Language': await load(() => currentLanguage() ?? 'en'),
    },
  }
}

function never() {
  return new Promise<never>(() => {})
}
