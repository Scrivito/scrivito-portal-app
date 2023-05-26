import * as Scrivito from 'scrivito'

export function objTitle(obj: Scrivito.Obj): string {
  const title = obj.get('title')

  return typeof title === 'string' && title ? title : '<untitled>'
}
