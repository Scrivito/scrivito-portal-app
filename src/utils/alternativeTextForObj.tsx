import { Obj } from 'scrivito'
import { ensureString } from './ensureString'

export function alternativeTextForObj(image: unknown): string {
  if (!(image instanceof Obj)) return ''

  return ensureString(image.get('alternativeText'))
}
