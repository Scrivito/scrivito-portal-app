import { isOptionalString } from './isOptionalString'
import { pisaDataBinaryToUrl } from './pisaDataBinaryToUrl'

export async function dataBinaryToUrl(
  binary: DataBinary,
): Promise<{ url: string; maxAge: number }> {
  if (isUrlDataBinary(binary)) {
    return { url: binary.url, maxAge: Number.MAX_VALUE }
  }

  if (binary.dataBase64) {
    const dataPrefix = `data:${binary.contentType};base64,`
    return {
      url: `${dataPrefix}${binary.dataBase64}`,
      maxAge: Number.MAX_VALUE,
    }
  }

  return pisaDataBinaryToUrl(binary)
}

export type DataBinary = UrlDataBinary | FullDataBinary

interface UrlDataBinary {
  url: string
}

export interface FullDataBinary {
  _id: string
  contentLength: number
  contentType: string
  filename: string
  url?: string
  dataBase64?: string
}

export function isDataBinary(item: unknown): item is DataBinary {
  return isUrlDataBinary(item) || isFullDataBinary(item)
}

function isUrlDataBinary(item: unknown): item is UrlDataBinary {
  if (!item) return false
  if (typeof item !== 'object') return false

  const urlOnly = item as UrlDataBinary
  return typeof urlOnly.url === 'string'
}

export function isFullDataBinary(item: unknown): item is FullDataBinary {
  if (!item) return false
  if (typeof item !== 'object') return false

  const binary = item as FullDataBinary

  return (
    isOptionalString(binary.url) &&
    isOptionalString(binary.dataBase64) &&
    typeof binary._id === 'string' &&
    typeof binary.filename === 'string' &&
    typeof binary.contentType === 'string' &&
    typeof binary.contentLength === 'number'
  )
}
