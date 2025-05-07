import { connect, Obj, isOnCurrentPath, LinkTag } from 'scrivito'
import Nav from 'react-bootstrap/Nav'
import NavDropdown from 'react-bootstrap/NavDropdown'
import { ObjIconAndTitle } from '../../../Components/ObjIconAndTitle'
import { objTitle } from '../../../utils/title'
import { isRedirect } from '../../../Objs/Redirect/RedirectObjClass'

export const NavItem = connect(function ScrivitoNavItem({
  eventKey,
  obj,
}: {
  eventKey: string
  obj: Obj
}) {
  if (obj.get('hideInNavigation') === true) return null

  if (obj.objClass() === 'Dropdown') {
    const shownChildren = obj
      .orderedChildren()
      .filter((child) => child.get('hideInNavigation') !== true)

    return (
      <NavDropdown title={objTitle(obj)} active={isOnCurrentPath(obj)}>
        {shownChildren.map((child) => (
          <NavDropdown.Item
            {...itemProps(child)}
            eventKey={`NavItem-${eventKey}-${child.id()}`}
            key={`NavItem-${eventKey}-${child.id()}`}
          >
            <ObjIconAndTitle obj={child} />
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
      <ObjIconAndTitle obj={obj} />
    </Nav.Link>
  )
})

function itemProps(obj: Obj) {
  const target = (isRedirect(obj) && obj.get('link')?.obj()) || obj

  return {
    active: isOnCurrentPath(target),
    as: LinkTag,
    to: target,
  }
}
