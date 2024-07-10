import { Obj } from 'scrivito'
import { ensureString } from './ensureString'

export function alternativeTextFromObj(image: unknown): string {
  if (!(image instanceof Obj)) return ''

  return ensureString(image.get('alternativeText'))
}
