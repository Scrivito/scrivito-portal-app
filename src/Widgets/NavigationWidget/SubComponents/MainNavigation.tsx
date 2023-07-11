import * as Scrivito from 'scrivito'
import Nav from 'react-bootstrap/Nav'
import { NavItem as NavItem } from './NavItem'

export const MainNavigation = Scrivito.connect(function MainNavigation({
  root,
}: {
  root: Scrivito.Obj
}) {
  return (
    <Nav className="navbar-main">
      <Scrivito.ChildListTag
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
    </Nav>
  )
})
