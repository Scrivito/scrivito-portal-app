import * as Scrivito from 'scrivito'
import { NavigationWidget } from '../NavigationWidgetClass'
import { NavItem } from './NavItem'
import Nav from 'react-bootstrap/Nav'
import NavDropdown from 'react-bootstrap/NavDropdown'
import { objTitle } from './objTitle'

export const MetaNavigation = Scrivito.connect(function MetaNavigation({
  widget,
}: {
  widget: InstanceType<typeof NavigationWidget>
}) {
  const metaNavigationPortalObjs = widget.get('metaNavigationPortalObjs')
  const showPortalNav = metaNavigationPortalObjs.length > 0

  return (
    <div className="navbar-meta">
      <Nav className="me-auto">
        {widget.get('metaNavigationObjs').map((metaObj, index) => (
          <NavItem obj={metaObj} key={`${metaObj.id()}${index}`} />
        ))}
      </Nav>

      {showPortalNav && (
        <Nav className="border-left ms-auto">
          <NavDropdown
            title={
              <>
                <i className="bi bi-person-circle" aria-hidden="true"></i>
                Customer Portal
              </>
            }
          >
            {widget.get('metaNavigationPortalObjs').map((portalObj, index) => (
              <NavDropdown.Item
                active={Scrivito.isOnCurrentPath(portalObj)}
                href={Scrivito.urlFor(portalObj)}
                onClick={(event: React.MouseEvent<HTMLElement>) => {
                  event.preventDefault()

                  Scrivito.navigateTo(portalObj)
                }}
                key={`${portalObj.id()}${index}`}
              >
                {objTitle(portalObj)}
              </NavDropdown.Item>
            ))}
          </NavDropdown>
        </Nav>
      )}
    </div>
  )
})
