import * as Scrivito from 'scrivito'
import React from 'react'
import { NavigationWidget } from '../NavigationWidgetClass'
import { NavItem } from './NavItem'
import Nav from 'react-bootstrap/Nav'
import NavDropdown from 'react-bootstrap/NavDropdown'
import { objIconAndTitle } from './objTitle'

export const MetaNavigation = Scrivito.connect(function MetaNavigation({
  widget,
}: {
  widget: InstanceType<typeof NavigationWidget>
}) {
  // TODO: Use CurrentUserDataItem once available
  const [loggedIn, setLoggedIn] = React.useState(false)

  const metaNavigationPortalOverview = widget.get(
    'metaNavigationPortalOverview'
  )
  const showPortalNav = !!metaNavigationPortalOverview

  const metaNavigationUserProfile = widget.get('metaNavigationUserProfile')
  const showUserProfileLink = !!metaNavigationUserProfile

  return (
    <div className="navbar-meta">
      <Nav className="me-auto">
        {widget.get('metaNavigationObjs').map((metaObj, index) => (
          <NavItem obj={metaObj} key={`${metaObj.id()}${index}`} />
        ))}
      </Nav>

      {showPortalNav && (
        <Nav className="border-left ms-auto">
          <Nav.Item>
            <Nav.Link
              active={Scrivito.isCurrentPage(metaNavigationPortalOverview)}
              as={Scrivito.LinkTag}
              to={metaNavigationPortalOverview}
            >
              {objIconAndTitle(metaNavigationPortalOverview)}
            </Nav.Link>
          </Nav.Item>
          {loggedIn ? (
            <NavDropdown
              title={
                <>
                  <i className="bi bi-person-circle" aria-hidden="true"></i>
                  <span className="nav-link-extended">
                    <Scrivito.ContentTag
                      content={widget}
                      attribute="metaNavigationUserTitle"
                      tag="span"
                    />

                    <Scrivito.ContentTag
                      content={widget}
                      attribute="metaNavigationUserDescription"
                      tag="span"
                      className="text-meta"
                    />
                  </span>
                </>
              }
            >
              {showUserProfileLink ? (
                <>
                  <NavDropdown.Item
                    active={Scrivito.isCurrentPage(metaNavigationUserProfile)}
                    as={Scrivito.LinkTag}
                    to={metaNavigationUserProfile}
                  >
                    {objIconAndTitle(metaNavigationUserProfile)}
                  </NavDropdown.Item>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                </>
              ) : (
                <></>
              )}
              <NavDropdown.Item
                onClick={(event: React.MouseEvent<HTMLElement>) => {
                  event.preventDefault()

                  setLoggedIn(false)
                }}
              >
                <i className={`bi bi-box-arrow-right`}></i> Log out
              </NavDropdown.Item>
            </NavDropdown>
          ) : (
            <Nav.Item>
              <Nav.Link
                className="btn"
                onClick={(event: React.MouseEvent<HTMLElement>) => {
                  event.preventDefault()

                  setLoggedIn(true)
                }}
              >
                <i className={`bi bi-box-arrow-in-right`}></i> Login
              </Nav.Link>
            </Nav.Item>
          )}
        </Nav>
      )}
    </div>
  )
})
