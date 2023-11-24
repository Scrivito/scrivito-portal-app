import { connect, Obj, ChildListTag } from 'scrivito'
import Nav from 'react-bootstrap/Nav'
import { NavItem as NavItem } from './NavItem'
import { SearchBox } from './SearchBox'

export const MainNavigation = connect(function MainNavigation({
  root,
  searchResultsPage,
}: {
  root: Obj
  searchResultsPage: Obj | null
}) {
  return (
    <Nav className="navbar-main">
      <ChildListTag
        className="navbar-nav me-auto mb-2 mb-md-0"
        tag="div"
        parent={root}
        renderChild={(child) => (
          <NavItem
            obj={child}
            eventKey={`MainNavigation-${root.id()}-${child.id()}`}
            key={`MainNavigation-${root.id()}-${child.id()}`}
          />
        )}
      />
      <SearchBox searchResultsPage={searchResultsPage} />
    </Nav>
  )
})
