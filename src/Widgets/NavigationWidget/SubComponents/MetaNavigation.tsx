import {
  connect,
  isCurrentPage,
  LinkTag,
  ContentTag,
  Obj,
  isUserLoggedIn,
  logout,
  ensureUserIsLoggedIn,
} from 'scrivito'
import { NavigationWidget } from '../NavigationWidgetClass'
import { NavItem } from './NavItem'
import Nav from 'react-bootstrap/Nav'
import NavDropdown from 'react-bootstrap/NavDropdown'
import { ObjIconAndTitle } from '../../../Components/ObjIconAndTitle'

export const MetaNavigation = connect(function MetaNavigation({
  widget,
}: {
  widget: InstanceType<typeof NavigationWidget>
}) {
  const metaNavigationPortalOverview = widget.get(
    'metaNavigationPortalOverview',
  )
  const showPortalNav = !!metaNavigationPortalOverview

  const metaNavigationUserProfile = widget.get('metaNavigationUserProfile')
  const showUserProfileLink = !!metaNavigationUserProfile

  return (
    <div className="navbar-meta">
      <Nav className="me-auto">
        {widget.get('metaNavigationObjs').map((metaObj, index) => (
          <NavItem
            obj={metaObj}
            eventKey={`${metaObj.id()}${index}`}
            key={`${metaObj.id()}${index}`}
          />
        ))}
      </Nav>

      {showPortalNav && (
        <Nav className="border-left ms-auto">
          {isUserLoggedIn() ? (
            <>
              <Nav.Item>
                <Nav.Link
                  active={isCurrentPage(metaNavigationPortalOverview)}
                  as={LinkTag}
                  eventKey={`MetaNavigation-${metaNavigationPortalOverview.id()}`}
                  key={`MetaNavigation-${metaNavigationPortalOverview.id()}`}
                  to={metaNavigationPortalOverview}
                >
                  <ObjIconAndTitle obj={metaNavigationPortalOverview} />
                </Nav.Link>
              </Nav.Item>
              <NavDropdown
                title={
                  <>
                    <i className="bi bi-person-circle" aria-hidden="true"></i>
                    <span className="nav-link-extended">
                      <ContentTag
                        content={widget}
                        attribute="metaNavigationUserTitle"
                        tag="span"
                        className="user-title"
                      />

                      <ContentTag
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
                      active={isCurrentPage(metaNavigationUserProfile)}
                      as={LinkTag}
                      eventKey={`MetaNavigation-${metaNavigationUserProfile.id()}`}
                      key={`MetaNavigation-${metaNavigationUserProfile.id()}`}
                      to={metaNavigationUserProfile}
                    >
                      <ObjIconAndTitle obj={metaNavigationUserProfile} />
                    </NavDropdown.Item>
                    <li>
                      <hr className="dropdown-divider" />
                    </li>
                  </>
                ) : (
                  <></>
                )}
                <NavDropdown.Item
                  as={LinkTag}
                  eventKey="MetaNavigation-LogOut"
                  key="MetaNavigation-LogOut"
                  onClick={() => {
                    logout()
                  }}
                  to={Obj.root()}
                >
                  <i className={`bi bi-box-arrow-right`}></i> Log out
                </NavDropdown.Item>
              </NavDropdown>
            </>
          ) : (
            <Nav.Item>
              <Nav.Link
                active={isCurrentPage(metaNavigationPortalOverview)}
                as={LinkTag}
                eventKey={`MetaNavigation-${metaNavigationPortalOverview.id()}`}
                key={`MetaNavigation-${metaNavigationPortalOverview.id()}`}
                onClick={() => {
                  ensureUserIsLoggedIn()
                }}
                to={metaNavigationPortalOverview}
              >
                <ObjIconAndTitle obj={metaNavigationPortalOverview} />
              </Nav.Link>
            </Nav.Item>
          )}
        </Nav>
      )}
    </div>
  )
})
