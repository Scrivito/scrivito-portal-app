export async function dataBinaryToUrl(
  binary: DataBinary,
): Promise<{ url: string; maxAge: number }> {
  if (binary.url) return { url: binary.url, maxAge: Number.MAX_VALUE }
  if (binary.dataBase64) {
    const dataPrefix = `data:${binary.contentType};base64,`
    return {
      url: `${dataPrefix}${binary.dataBase64}`,
      maxAge: Number.MAX_VALUE,
    }
  }

  throw new Error('Not yet implemented!')
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
