import * as Scrivito from 'scrivito'
import { NavigationWidget } from '../NavigationWidgetClass'
import { NavItem } from './NavItem'
import Nav from 'react-bootstrap/Nav'
import NavDropdown from 'react-bootstrap/NavDropdown'
import { objTitle, objIconAndTitle } from './objTitle'

export const MetaNavigation = Scrivito.connect(function MetaNavigation({
  widget,
}: {
  widget: InstanceType<typeof NavigationWidget>
}) {
  const metaNavigationPortalOverview = widget.get(
    'metaNavigationPortalOverview'
  )
  const showPortalNav = !!metaNavigationPortalOverview

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
                {objTitle(metaNavigationPortalOverview)}
              </>
            }
          >
            {widget
              .get('metaNavigationPortalOverview')
              ?.orderedChildren()
              .map((portalObj) => (
                <NavDropdown.Item
                  active={Scrivito.isOnCurrentPath(portalObj)}
                  href={Scrivito.urlFor(portalObj)}
                  onClick={(event: React.MouseEvent<HTMLElement>) => {
                    event.preventDefault()

                    Scrivito.navigateTo(portalObj)
                  }}
                  key={portalObj.id()}
                >
                  {objIconAndTitle(portalObj)}
                </NavDropdown.Item>
              ))}
          </NavDropdown>
        </Nav>
      )}
    </div>
  )
})
