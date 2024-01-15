import { LinkTag, Obj, connect, currentPage } from 'scrivito'
import { objTitle } from '../utils/objTitle'
import { isHomepage } from '../Objs/Homepage/HomepageObjClass'

export const Breadcrumb = connect(function Breadcrumb() {
  const currentPageObj = currentPage()
  if (!currentPageObj) return <nav aria-label="breadcrumb" />

  const breadcrumbItems: Obj[] = []
  let item = currentPageObj.parent()
  while (item) {
    if (showInNavigation(item)) breadcrumbItems.unshift(item)
    item = item.parent()
  }

  return (
    <nav aria-label="breadcrumb">
      <ol className="breadcrumb m-1">
        {breadcrumbItems.map((obj) => (
          <li className="breadcrumb-item" key={obj.id()}>
            <LinkTag to={obj}>{objTitle(obj)}</LinkTag>
          </li>
        ))}
        <li className="breadcrumb-item active">{objTitle(currentPageObj)}</li>
      </ol>
    </nav>
  )
})

function showInNavigation(item: Obj): boolean {
  if (item.get('hideInNavigation')) return false

  if (isHomepage(item)) return !item.get('sitePortalOnlyMode')

  return true
}
