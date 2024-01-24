import { unstable_JrRestApi } from 'scrivito'

export async function pisaBinaryToUrl(binary: PisaBinary): Promise<string> {
  const result = await unstable_JrRestApi.fetch(
    `../pisa-api/binary-access-token/${binary._id}`,
  )
  if (!isAccessToken(result)) throw new Error(`Unexpected result: ${result}`)

  return `${window.origin}/pisa-api${result.accessToken}`
}

export interface PisaBinary {
  _id: string
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

  const accessToken = item as { accessToken: string }
  return typeof accessToken.accessToken === 'string'
}
