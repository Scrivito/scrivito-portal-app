import {
  ChildListTag,
  connect,
  isCurrentPage,
  isOnCurrentPath,
  LinkTag,
  Obj,
  provideComponent,
} from 'scrivito'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import { ObjIconAndTitle } from '../../Components/ObjIconAndTitle'
import { VerticalNavigationWidget } from './VerticalNavigationWidgetClass'

provideComponent(VerticalNavigationWidget, ({ widget }) => {
  const page = widget.obj()

  return (
    <Navbar expand="lg" collapseOnSelect>
      <div>
        <Navbar.Toggle className="btn mb-3 w-100">
          <span className="d-flex px-2 justify-content-between align-items-center w-100">
            <span>Menu</span>
            <span className="navbar-toggler-default">
              <i className="bi-list"></i>
            </span>
            <span className="navbar-toggler-toggled">
              <i className="bi-x"></i>
            </span>
          </span>
        </Navbar.Toggle>
      </div>
      <Navbar.Collapse id="nav-sidebar" className="card mb-3">
        <ul
          className="nav-bordered"
          // TODO: Make official styling & make it work in mobile as well
          style={{ margin: '0', borderBottom: '1px solid var(--border)' }}
        >
          <NavItem obj={page} isActive={isCurrentPage(page)} />
        </ul>
        <SubNavItems parent={page} />
      </Navbar.Collapse>
    </Navbar>
  )
})

const NavItem = connect(
  ({ obj, isActive }: { obj: Obj; isActive: boolean }) => {
    if (obj.get('hideInNavigation') === true) return null

    const key = `VerticalNavigationWidget-${obj.id()}`

    return (
      <li className={isActive ? 'active' : ''}>
        <Nav.Link as={LinkTag} eventKey={key} key={key} to={obj}>
          <ObjIconAndTitle obj={obj} />
        </Nav.Link>
      </li>
    )
  },
)

const SubNavItems = connect(({ parent }: { parent: Obj }) => {
  return (
    <ChildListTag
      className="nav-bordered"
      parent={parent}
      renderChild={(child) => (
        <NavItem obj={child} isActive={isOnCurrentPath(child)} />
      )}
    />
  )
})
