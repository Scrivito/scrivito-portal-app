import {
  Obj,
  createRestApiClient,
  currentLanguage,
  isUserLoggedIn,
  load,
} from 'scrivito'
import { isHomepage } from '../Objs/Homepage/HomepageObjClass'

export async function pisaUrl(): Promise<string | null> {
  if (import.meta.env.FORCE_LOCAL_STORAGE) return null

  const defaultRoot = await load(() =>
    Obj.onAllSites().get(import.meta.env.SCRIVITO_ROOT_OBJ_ID),
  )
  if (!isHomepage(defaultRoot)) return never()

  return defaultRoot.get('pisaUrl') || null
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

  const headers: { 'Accept-Language': string; Authorization?: string } = {
    'Accept-Language': await load(() => currentLanguage() ?? 'en'),
  }

  const authorization: string | null = getAuthorization()
  if (authorization) headers.Authorization = authorization

  return {
    url: `${baseUrl}/${subPath}`,
    headers,
  }
}

function never() {
  return new Promise<never>(() => {})
}

let cachedAuthorization: string | null | undefined = undefined
function getAuthorization(): string | null {
  if (cachedAuthorization === undefined) cachedAuthorization = calculate()

  return cachedAuthorization

  function calculate() {
    if (isUserLoggedIn()) return null

    if (typeof window === 'undefined') return null

    const urlParams = new URLSearchParams(window.location.search)
    const token = urlParams.get('token')

    return token ? `JWT ${token}` : null
  }
}
