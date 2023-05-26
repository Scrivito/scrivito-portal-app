import * as Scrivito from 'scrivito'
import Nav from 'react-bootstrap/Nav'
import NavDropdown from 'react-bootstrap/NavDropdown'

export const NavItem = Scrivito.connect(function ScrivitoNavItem({
  obj,
}: {
  obj: Scrivito.Obj
}) {
  if (obj.get('hideInNavigation') === true) return null

  if (obj.objClass() === 'Dropdown') {
    return (
      <NavDropdown title={objTitle(obj)} active={Scrivito.isOnCurrentPath(obj)}>
        {obj.orderedChildren().map((child) => (
          <NavDropdown.Item {...itemProps(child)} key={child.id()}>
            {objTitle(child)}
          </NavDropdown.Item>
        ))}
      </NavDropdown>
    )
  }

  const linkIcon = obj.get('linkIcon')
  return (
    <Nav.Link {...itemProps(obj)}>
      {linkIcon && (
        <>
          <i className={`bi ${linkIcon}`}></i>
        </>
      )}
      {objTitle(obj)}
    </Nav.Link>
  )
})

function objTitle(obj: Scrivito.Obj): string {
  const title = obj.get('title')

  return typeof title === 'string' && title ? title : '<untitled>'
}

function itemProps(obj: Scrivito.Obj) {
  return {
    active: Scrivito.isOnCurrentPath(obj),
    href: Scrivito.urlFor(obj),
    onClick: (event: React.MouseEvent<HTMLElement>) => {
      event.preventDefault()

      Scrivito.navigateTo(obj)
    },
  }
}
