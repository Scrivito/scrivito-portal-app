import { Obj } from 'scrivito'
import { HomepageInstance } from '../Objs/Homepage/HomepageObjClass'
import { isRedirect } from '../Objs/Redirect/RedirectObjClass'

// TODO: Remove redirect and function workaround, once #10699 is available
export function getSitePortalOverviewPage(root: HomepageInstance): Obj | null {
  const sitePortalOverviewPage = root.get('sitePortalOverviewPage')
  if (!isRedirect(sitePortalOverviewPage)) return sitePortalOverviewPage

  return sitePortalOverviewPage.get('link')?.obj() || sitePortalOverviewPage
}
