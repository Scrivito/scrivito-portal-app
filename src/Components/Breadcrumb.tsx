import { LinkTag, Obj, connect, currentPage } from 'scrivito'
import { objTitle } from '../utils/objTitle'

export const Breadcrumb = connect(function Breadcrumb() {
  const currentPageObj = currentPage()
  if (!currentPageObj) return <nav aria-label="breadcrumb" />

  const breadcrumbItems = currentPageObj
    .ancestors()
    .filter((item): item is Obj => !!item && !item.get('hideInNavigation'))

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
