import { currentLanguage, load, Obj } from 'scrivito'
import { isHomepage } from '../Objs/Homepage/HomepageObjClass'

async function jwtPisaSalesApiUrl(): Promise<string | null> {
  if (import.meta.env.FORCE_LOCAL_STORAGE) return null

  const defaultRoot = await load(() =>
    Obj.onAllSites().get(import.meta.env.SCRIVITO_ROOT_OBJ_ID),
  )
  if (!isHomepage(defaultRoot)) return null

  return defaultRoot.get('jwtPisaSalesApiUrl') || null
}

export async function jwtPisaSalesApiConfig({
  Authorization,
  subPath,
}: {
  Authorization: string
  subPath: string
}) {
  const baseUrl = await jwtPisaSalesApiUrl()
  if (!baseUrl) return null

  return {
    url: `${baseUrl}/${subPath}`,
    headers: {
      'Accept-Language': await load(() => currentLanguage() ?? 'en'),
      Authorization,
    },
  }
}
