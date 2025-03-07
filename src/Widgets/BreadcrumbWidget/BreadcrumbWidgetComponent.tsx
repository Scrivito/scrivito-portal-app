import { LinkTag, Obj, currentPage, provideComponent } from 'scrivito'
import { BreadcrumbWidget } from './BreadcrumbWidgetClass'
import { objTitle } from '../../utils/objTitle'

provideComponent(BreadcrumbWidget, () => {
  const currentPageObj = currentPage()
  if (!currentPageObj) return <nav aria-label="breadcrumb" />

  const breadcrumbItems = currentPageObj
    .ancestors()
    .filter((item): item is Obj => !!item && !item.get('hideInNavigation'))

  return (
    <nav aria-label="breadcrumb" className="py-2">
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
