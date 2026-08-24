import { connect, ChildListTag } from 'scrivito'
import { Nav } from 'react-bootstrap'
import { NavItem as NavItem } from './NavItem'
import { SearchBox } from './SearchBox'
import { HomepageInstance } from '../../../Objs/Homepage/HomepageObjClass'

export const MainNavigation = connect(function MainNavigation({
  root,
}: {
  root: HomepageInstance
}) {
  return (
    <Nav className="navbar-main flex w-full max-lg:mt-3 max-lg:flex-col-reverse">
      <ChildListTag
        className="navbar-nav me-auto flex max-lg:flex-col"
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
      <SearchBox searchResultsPage={root.get('siteSearchResultsPage')} />
    </Nav>
  )
})
