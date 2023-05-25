import * as Scrivito from 'scrivito'
import { NavigationWidget } from '../NavigationWidgetClass'
import { NavItem } from './NavItem'
import Nav from 'react-bootstrap/Nav'
import NavDropdown from 'react-bootstrap/NavDropdown'

export const MetaNavigation = Scrivito.connect(function MetaNavigation({
  widget,
}: {
  widget: InstanceType<typeof NavigationWidget>
}) {
  const metaNavigationPortalObjs = widget.get('metaNavigationPortalObjs')
  return (
    <div className="navbar-meta">
      <Nav className="me-auto">
        {widget.get('metaNavigationObjs').map((metaObj, index) => (
          <NavItem obj={metaObj} key={`${metaObj.id()}${index}`} />
        ))}
      </Nav>
      <Nav className="border-left ms-auto">
        {metaNavigationPortalObjs.length > 0 && (
          <NavDropdown
            title={
              <>
                <i className="bi bi-person-circle" aria-hidden="true"></i>
                Customer Portal
              </>
            }
          >
            {widget.get('metaNavigationPortalObjs').map((portalObj, index) => (
              <NavItem obj={portalObj} key={`${portalObj.id()}${index}`} />
            ))}
          </NavDropdown>
        )}
      </Nav>
    </div>
  )
})
