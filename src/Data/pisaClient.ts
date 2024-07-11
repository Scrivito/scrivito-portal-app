import { Obj, createRestApiClient, currentLanguage, load } from 'scrivito'
import { isHomepage } from '../Objs/Homepage/HomepageObjClass'

export async function pisaUrl(): Promise<string> {
  const defaultRoot = await load(() => Obj.onSite('default').root())
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
  const url = `${await pisaUrl()}/${subPath}`

  const language = await load(() => currentLanguage() ?? 'en')
  const headers = { 'Accept-Language': language }

  return { url, headers }
}

function never() {
  return new Promise<never>(() => {})
}
