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
import { useEffect, useState } from 'react'

provideComponent(VerticalNavigationWidget, ({ widget }) => {
  const page = widget.obj()
  const navigationDepth = Number(widget.get('navigationDepth'))

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
        <SubNavItems navigationDepth={navigationDepth} parent={page} />
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

const SubNavItems = connect(
  ({ parent, navigationDepth }: { parent: Obj; navigationDepth: number }) => {
    return (
      <ChildListTag
        className="nav-bordered"
        parent={parent}
        renderChild={(child) =>
          navigationDepth > 0 ? (
            <ExpandableNavItem obj={child} navigationDepth={navigationDepth} />
          ) : (
            <NavItem obj={child} isActive={isOnCurrentPath(child)} />
          )
        }
      />
    )
  },
)

const ExpandableNavItem = connect(
  ({ obj, navigationDepth }: { obj: Obj; navigationDepth: number }) => {
    const [isExpanded, setIsExpanded] = useState(false)
    const children = obj
      .orderedChildren()
      .filter((c) => c.get('hideInNavigation') !== true)

    const hasChildren = children.length > 0
    const isActive = isOnCurrentPath(obj)
    const isInitiallyExpanded = hasChildren && isActive && !isCurrentPage(obj)

    useEffect(() => {
      if (isInitiallyExpanded) setIsExpanded(true)
    }, [isInitiallyExpanded])

    if (obj.get('hideInNavigation') === true) return null

    if (!hasChildren) return <NavItem obj={obj} isActive={isActive} />

    const key = `VerticalNavigationWidget-expandable-${obj.id()}`

    return (
      <li className={isActive ? 'active' : ''}>
        <Nav.Link as={LinkTag} eventKey={key} key={key} to={obj}>
          <button
            className={`dropdown-toggle nav-link${isExpanded ? ' show' : ''}`}
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
              setIsExpanded((isExpanded) => !isExpanded)
            }}
          ></button>
          <ObjIconAndTitle obj={obj} />
        </Nav.Link>

        {isExpanded && (
          <SubNavItems parent={obj} navigationDepth={navigationDepth - 1} />
        )}
      </li>
    )
  },
)
