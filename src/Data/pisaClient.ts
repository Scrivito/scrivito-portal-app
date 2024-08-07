import { Obj, createRestApiClient, currentLanguage, load } from 'scrivito'
import { isHomepage } from '../Objs/Homepage/HomepageObjClass'

export async function pisaUrl(): Promise<string> {
  const defaultRoot = await load(() =>
    Obj.onAllSites().get(import.meta.env.SCRIVITO_ROOT_OBJ_ID),
  )
  if (!isHomepage(defaultRoot)) return never()

  const url = defaultRoot.get('pisaUrl')
  if (!url) {
    console.log('Please configure a pisaUrl on the default homepage.')
    return never()
  }

  return url
}

export async function pisaClient(subPath: string) {
  const { url, headers } = await pisaConfig(subPath)

  return createRestApiClient(url, { headers })
}

export async function pisaConfig(subPath: string) {
  return {
    url: `${await pisaUrl()}/${subPath}`,
    headers: {
      'Accept-Language': await load(() => currentLanguage() ?? 'en'),
    },
  }
}

function never() {
  return new Promise<never>(() => {})
}
