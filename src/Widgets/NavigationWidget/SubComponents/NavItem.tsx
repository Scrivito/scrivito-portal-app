import * as Scrivito from 'scrivito'
import Nav from 'react-bootstrap/Nav'
import NavDropdown from 'react-bootstrap/NavDropdown'
import { objIconAndTitle, objTitle } from './objTitle'

export const NavItem = Scrivito.connect(function ScrivitoNavItem({
  eventKey,
  obj,
}: {
  eventKey: string
  obj: Scrivito.Obj
}) {
  if (obj.get('hideInNavigation') === true) return null

  if (obj.objClass() === 'Dropdown') {
    return (
      <NavDropdown title={objTitle(obj)} active={Scrivito.isOnCurrentPath(obj)}>
        {obj.orderedChildren().map((child) => (
          <NavDropdown.Item
            {...itemProps(child)}
            eventKey={`NavItem-${eventKey}-${child.id()}`}
            key={`NavItem-${eventKey}-${child.id()}`}
          >
            {objIconAndTitle(child)}
          </NavDropdown.Item>
        ))}
      </NavDropdown>
    )
  }

  return (
    <Nav.Link
      {...itemProps(obj)}
      eventKey={`NavItem-${eventKey}`}
      key={`NavItem-${eventKey}`}
    >
      {objIconAndTitle(obj)}
    </Nav.Link>
  )
})

function itemProps(obj: Scrivito.Obj) {
  return {
    active: Scrivito.isOnCurrentPath(obj),
    as: Scrivito.LinkTag,
    to: obj,
  }
}
