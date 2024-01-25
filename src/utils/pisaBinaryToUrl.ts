import { unstable_JrRestApi } from 'scrivito'

export async function pisaBinaryToUrl(
  binary: PisaBinary,
): Promise<{ url: string; maxAge: number }> {
  if (binary.url) return { url: binary.url, maxAge: 100000000 }

  const result = await unstable_JrRestApi.fetch(
    `../pisa-api/binary-access-token/${binary._id}`,
  )
  if (!isAccessToken(result)) throw new Error(`Unexpected result: ${result}`)

  // TODO: Use pisa url directly - no proxy!
  return { url: `${window.origin}/pisa-api${result.accessToken}`, maxAge: 60 }
}

export interface PisaBinary {
  _id: string
  url?: string
  filename: string
  contentType: string
  contentLength: number
}

export function isPisaBinary(item: unknown): item is PisaBinary {
  if (!item) return false
  if (typeof item !== 'object') return false

  const pisaBinary = item as PisaBinary
  return (
    typeof pisaBinary._id === 'string' &&
    typeof pisaBinary.filename === 'string' &&
    typeof pisaBinary.contentType === 'string' &&
    typeof pisaBinary.contentLength === 'number'
  )
}

function isAccessToken(item: unknown): item is { accessToken: string } {
  if (!item) return false
  if (typeof item !== 'object') return false

  const accessToken = item as { accessToken: string; maxAge: number } //maxAge in seconds
  return typeof accessToken.accessToken === 'string'
}
