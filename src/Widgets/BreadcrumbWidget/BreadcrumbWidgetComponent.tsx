import { LinkTag, currentPage, provideComponent } from 'scrivito'
import { BreadcrumbWidget } from './BreadcrumbWidgetClass'
import { isDropdown } from '../../Objs/Dropdown/DropdownObjClass'
import { breadcrumbAncestors } from '../../utils/breadcrumbAncestors'
import { objTitle } from '../../utils/title'

provideComponent(BreadcrumbWidget, () => {
  const currentPageObj = currentPage()
  if (!currentPageObj) return <nav aria-label="breadcrumb" />

  const breadcrumbItems = breadcrumbAncestors(currentPageObj)

  return (
    <nav aria-label="breadcrumb" className="py-2">
      <ol className="breadcrumb m-1">
        {breadcrumbItems.map((obj) => (
          <li className="breadcrumb-item" key={obj.id()}>
            {/* A dropdown is no page of its own, so it is not linked here. */}
            {isDropdown(obj) ? (
              objTitle(obj)
            ) : (
              <LinkTag to={obj}>{objTitle(obj)}</LinkTag>
            )}
          </li>
        ))}
        <li className="breadcrumb-item active">{objTitle(currentPageObj)}</li>
      </ol>
    </nav>
  )
})
