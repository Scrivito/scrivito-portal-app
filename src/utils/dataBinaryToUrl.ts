import { unstable_JrRestApi } from 'scrivito'
import { scrivitoTenantId } from '../config/scrivitoTenantId'

export async function dataBinaryToUrl(
  binary: DataBinary,
): Promise<{ url: string; maxAge: number }> {
  if (binary.url) return { url: binary.url, maxAge: Number.MAX_VALUE }

  const accessTokens = await unstable_JrRestApi.fetch(
    `../pisa-api/${scrivitoTenantId().tenant}/binary-access-token/${binary._id}`,
  )
  if (!isAccessToken(accessTokens)) {
    throw new Error(`Unexpected result: ${accessTokens}`)
  }

  // TODO: Use pisa url directly - no proxy!
  return {
    url: `${window.origin}/pisa-api/${scrivitoTenantId().tenant}${accessTokens.accessToken}`,
    maxAge: accessTokens.maxAge,
  }
}

export interface DataBinary {
  _id: string
  contentLength: number
  contentType: string
  filename: string
  url?: string
  dataBase64?: string
}

export function isDataBinary(item: unknown): item is DataBinary {
  if (!item) return false
  if (typeof item !== 'object') return false

  const pisaBinary = item as DataBinary
  if (pisaBinary.url !== undefined && typeof pisaBinary.url !== 'string') {
    return false
  }

  return (
    typeof pisaBinary._id === 'string' &&
    typeof pisaBinary.filename === 'string' &&
    typeof pisaBinary.contentType === 'string' &&
    typeof pisaBinary.contentLength === 'number'
  )
}

interface AccessToken {
  accessToken: string
  maxAge: number
}

function isAccessToken(item: unknown): item is AccessToken {
  if (!item) return false
  if (typeof item !== 'object') return false

  const accessToken = item as AccessToken
  return (
    typeof accessToken.accessToken === 'string' &&
    typeof accessToken.maxAge === 'number'
  )
}
