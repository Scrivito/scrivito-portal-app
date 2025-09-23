import { Obj } from 'scrivito'
import { isHomepage } from '../Objs/Homepage/HomepageObjClass'

export function getCurrentPreviewSize():
  | 'mobile'
  | 'tablet'
  | 'laptop'
  | 'desktop' {
  Obj.onAllSites().all().count() // pretend to be a function, that needs a loading context

  const root = Obj.root()
  if (!isHomepage(root)) return 'desktop'

  const siteMaxWidth = root.get('siteMaxWidth')
  if (!siteMaxWidth) return 'desktop'

  if (siteMaxWidth <= 320) return 'mobile'
  if (siteMaxWidth <= 768) return 'tablet'
  if (siteMaxWidth <= 1024) return 'laptop'

  return 'desktop'
}
