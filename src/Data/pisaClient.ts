import {
  Obj,
  createRestApiClient,
  currentLanguage,
  getInstanceId,
  isUserLoggedIn,
  load,
} from 'scrivito'
import { isHomepage } from '../Objs/Homepage/HomepageObjClass'

export async function pisaSalesApiUrl(): Promise<string | null> {
  const defaultRoot = await load(() =>
    Obj.onAllSites().get(import.meta.env.SCRIVITO_ROOT_OBJ_ID),
  )
  // Do not proceed, if no content is available (e.g. during initialization).
  if (!isHomepage(defaultRoot)) return never()

  if (import.meta.env.FORCE_LOCAL_STORAGE) return null

  await load(() => Obj.onAllSites().all().count()) // TODO: Remove workaround for issue #11924
  if (!isUserLoggedIn()) return null

  const instanceConfig = (await createRestApiClient(
    'https://api.justrelate.com',
  ).get(`/ams/instances/${getInstanceId()}`)) as {
    pisa_sales_api_url?: string | null
  }

  return instanceConfig.pisa_sales_api_url || null
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
      'Accept-Language': await load(() => currentLanguage() ?? 'en'),
    },
  }
}

function never() {
  return new Promise<never>(() => {})
}
