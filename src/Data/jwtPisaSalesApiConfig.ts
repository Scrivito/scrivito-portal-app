import type { ApiClientOptions } from 'scrivito'
import { currentLanguage, load, Obj } from 'scrivito'
import { isHomepage } from '../Objs/Homepage/HomepageObjClass'
import { getTokenAuthorization } from './getTokenAuthorization'

export async function jwtPisaSalesApiConfig({
  subPath,
}: {
  subPath: string
}): Promise<({ url: string } & ApiClientOptions) | null> {
  const tokenAuthorization = getTokenAuthorization()
  if (!tokenAuthorization) return null

  const baseUrl = await jwtPisaSalesApiUrl()
  if (!baseUrl) return null

  return {
    url: `${baseUrl}/${subPath}`,
    headers: {
      'Accept-Language': await load(() => currentLanguage() ?? 'en'),
      Authorization: tokenAuthorization,
    },
  }
}

async function jwtPisaSalesApiUrl(): Promise<string | null> {
  if (import.meta.env.FORCE_LOCAL_STORAGE) return null

  const defaultRoot = await load(() =>
    Obj.onAllSites().get(import.meta.env.SCRIVITO_ROOT_OBJ_ID),
  )
  if (!isHomepage(defaultRoot)) return null

  return defaultRoot.get('jwtPisaSalesApiUrl') || null
}
