import type { ApiClientOptions, Obj } from 'scrivito'
import { currentLanguage, load } from 'scrivito'
import { orderBy } from 'lodash-es'
import { isHomepage } from '../Objs/Homepage/HomepageObjClass'
import { getTokenAuthorization } from './getTokenAuthorization'
import { defaultSiteVersions } from '../multiSite/defaultSiteVersions'

export async function jwtPisaSalesApiConfig({
  subPath,
}: {
  subPath: string
}): Promise<({ url: string } & ApiClientOptions) | null> {
  const jwtConfig = await jwtPisaSalesApiAuth()
  if (!jwtConfig) return null
  if (jwtConfig.token === null) return null

  return {
    url: `${jwtConfig.apiUrl}/${subPath}`,
    headers: {
      'Accept-Language': await load(() => currentLanguage() ?? 'en'),
      Authorization: jwtConfig.token,
    },
  }
}

export async function jwtPisaSalesApiAuth(): Promise<{
  apiUrl: string
  token: string | null
} | null> {
  const apiUrl = await jwtPisaSalesApiUrl()
  if (!apiUrl) return null

  const token = getTokenAuthorization()
  if (!token) return { apiUrl, token: null }

  return { apiUrl, token }
}

export function jwtPisaSalesConfigSite(): Obj | undefined {
  return orderBy(defaultSiteVersions().toArray(), [
    (site) => (site.language() === 'en' ? 0 : 1),
    (site) => site.createdAt(),
    (site) => site.id(),
  ])[0]
}

async function jwtPisaSalesApiUrl(): Promise<string | null> {
  if (import.meta.env.FORCE_LOCAL_STORAGE) return null

  const root = await load(() => jwtPisaSalesConfigSite())
  if (!isHomepage(root)) return null

  return root.get('jwtPisaSalesApiUrl') || null
}
