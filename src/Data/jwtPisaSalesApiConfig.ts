import type { ApiClientOptions } from 'scrivito'
import { currentLanguage, load } from 'scrivito'
import { orderBy } from 'lodash-es'
import { isHomepage } from '../Objs/Homepage/HomepageObjClass'
import { getTokenAuthorization } from './getTokenAuthorization'
import { defaultSites } from '../multiSite/defaultSites'

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

export function jwtPisaSalesConfigSite() {
  const preferences = ['en', 'de', 'fr', 'pl']

  const sortedSites = orderBy(
    defaultSites().toArray(),
    [
      (obj) => {
        const lang = obj.language()
        const index = lang ? preferences.indexOf(lang) : -1
        return index === -1 ? preferences.length : index
      },
      (obj) => obj.createdAt(),
      (obj) => obj.id(),
    ],
    ['asc', 'asc', 'asc'],
  )

  return sortedSites[0]
}

async function jwtPisaSalesApiUrl(): Promise<string | null> {
  if (import.meta.env.FORCE_LOCAL_STORAGE) return null

  const root = await load(() => jwtPisaSalesConfigSite())
  if (!isHomepage(root)) return null

  return root.get('jwtPisaSalesApiUrl') || null
}
