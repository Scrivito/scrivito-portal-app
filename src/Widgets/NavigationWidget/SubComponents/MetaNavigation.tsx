import * as Scrivito from 'scrivito'
import React from 'react'
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
  // TODO: Use `Scrivito.currentUser()` once available
  const [currentUser, setCurrentUser] = React.useState<null | {
    id: string
    name: string
    email: string
  }>(null)

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
                <span className="nav-link-extended">
                  <span>{objTitle(metaNavigationPortalOverview)}</span>
                  <span className="text-meta">
                    {currentUser ? currentUser.name : 'Please log in'}
                  </span>
                </span>
              </>
            }
          >
            <NavDropdown.Item
              active={Scrivito.isCurrentPage(metaNavigationPortalOverview)}
              href={Scrivito.urlFor(metaNavigationPortalOverview)}
              onClick={(event: React.MouseEvent<HTMLElement>) => {
                event.preventDefault()

                Scrivito.navigateTo(metaNavigationPortalOverview)
              }}
            >
              {objIconAndTitle(metaNavigationPortalOverview)}
            </NavDropdown.Item>
            <li>
              <hr className="dropdown-divider" />
            </li>
            {metaNavigationPortalOverview.orderedChildren().map((portalObj) => (
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
            <li>
              <hr className="dropdown-divider" />
            </li>
            {currentUser === null ? (
              <NavDropdown.Item
                onClick={(event: React.MouseEvent<HTMLElement>) => {
                  event.preventDefault()

                  setCurrentUser({
                    id: '123321',
                    name: 'Jane Smith',
                    email: 'jane.smith@example.com',
                  })
                }}
              >
                <>
                  <i className={`bi bi-box-arrow-in-right`}></i>
                </>
                Log in
              </NavDropdown.Item>
            ) : (
              <NavDropdown.Item
                onClick={(event: React.MouseEvent<HTMLElement>) => {
                  event.preventDefault()

                  setCurrentUser(null)
                }}
              >
                <>
                  <i className={`bi bi-box-arrow-right`}></i>
                </>
                Log out
              </NavDropdown.Item>
            )}
          </NavDropdown>
        </Nav>
      )}
    </div>
  )
})
