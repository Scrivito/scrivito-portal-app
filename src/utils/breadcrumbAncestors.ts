import { Obj } from 'scrivito'

/** The ancestors of the page that are shown in its breadcrumb. */
export function breadcrumbAncestors(page: Obj): Obj[] {
  return page
    .ancestors()
    .filter((item): item is Obj => !!item && !item.get('hideInNavigation'))
}
