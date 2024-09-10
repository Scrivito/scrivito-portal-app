import {
  ChildListTag,
  connect,
  currentPage,
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
  const showGrandChildren = widget.get('showGrandChildren') ? 2 : 0

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
          <li className={isCurrentPage(page) ? 'active' : ''}>
            <Nav.Link
              as={LinkTag}
              eventKey={`VerticalNavigationWidget-${widget.id()}-${page.id()}`}
              key={`VerticalNavigationWidget-${widget.id()}-${page.id()}`}
              to={page}
            >
              <ObjIconAndTitle obj={page} />
            </Nav.Link>
          </li>
        </ul>
        <ChildListTag
          className="nav-bordered"
          tag="ul"
          parent={page}
          renderChild={(child) => (
            <Child child={child} showGrandChildren={showGrandChildren} />
          )}
        />
      </Navbar.Collapse>
    </Navbar>
  )
})

const Child = connect(function ({
  child,
  showGrandChildren,
}: {
  child: Obj
  showGrandChildren: number
}) {
  const [expanded, setExpanded] = useState(false)
  const grandChildren = showGrandChildren
    ? child.orderedChildren().filter((c) => c.get('hideInNavigation') !== true)
    : []
  const hasGrandChildren = grandChildren.length > 0
  const childPath = child.path()
  const currentPagePath = currentPage()?.path()

  useEffect(() => {
    if (!hasGrandChildren) return
    if (!childPath) return

    if (currentPagePath?.startsWith(childPath)) setExpanded(true)
  }, [hasGrandChildren, childPath, currentPagePath])

  if (child.get('hideInNavigation') === true) return null

  const key = `VerticalNavigationWidget-Child-${child.id()}`

  return (
    <li className={isOnCurrentPath(child) ? 'active' : ''}>
      <Nav.Link as={LinkTag} eventKey={key} key={key} to={child}>
        {hasGrandChildren && (
          <button
            className={`dropdown-toggle nav-link${expanded ? ' show' : ''}`}
            onClick={(e) => {
              e.preventDefault()

              setExpanded((expanded) => !expanded)
            }}
          ></button>
        )}
        <ObjIconAndTitle obj={child} />
      </Nav.Link>

      {hasGrandChildren && expanded && (
        <ChildListTag
          className="nav-bordered"
          tag="ul"
          parent={child}
          renderChild={(grandChild) =>
            showGrandChildren === 1 ? (
              <GrandChild grandChild={grandChild} />
            ) : (
              <Child
                child={grandChild}
                showGrandChildren={showGrandChildren - 1}
              />
            )
          }
        />
      )}
    </li>
  )
})

const GrandChild = connect(function GrandChild({
  grandChild,
}: {
  grandChild: Obj
}) {
  if (grandChild.get('hideInNavigation') === true) return null

  const key = `VerticalNavigationWidget-GrandChild-${grandChild.id()}`

  return (
    <li className={isCurrentPage(grandChild) ? 'active' : ''}>
      <Nav.Link as={LinkTag} eventKey={key} key={key} to={grandChild}>
        <ObjIconAndTitle obj={grandChild} />
      </Nav.Link>
    </li>
  )
})
