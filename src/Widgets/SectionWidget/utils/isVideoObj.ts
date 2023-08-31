import { Obj } from 'scrivito'

export function isVideoObj(obj: Obj | null): boolean {
  if (!obj) return false

  const contentType = obj.contentType()
  if (!contentType) return false

  return contentType.startsWith('video/')
}
