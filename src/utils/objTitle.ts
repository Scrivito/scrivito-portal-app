import { Obj } from 'scrivito'

export function objTitle(obj: Obj) {
  const title = obj.get('title')

  return typeof title === 'string' && title ? title : '<untitled>'
}
