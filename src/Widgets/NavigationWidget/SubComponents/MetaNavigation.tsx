import {
  connect,
  isCurrentPage,
  LinkTag,
  ContentTag,
  Obj,
  isUserLoggedIn,
  logout,
} from 'scrivito'
import { NavigationWidgetInstance } from '../NavigationWidgetClass'
import { NavItem } from './NavItem'
import Nav from 'react-bootstrap/Nav'
import NavDropdown from 'react-bootstrap/NavDropdown'
import { ObjIconAndTitle } from '../../../Components/ObjIconAndTitle'
import { CurrentUserDataItem } from '../../../Data/CurrentUser/CurrentUserDataItem'
import { containsItems, numberOfCartItems } from '../../../Data/CartItem/Cart'
import { ensureString } from '../../../utils/ensureString'
import { HomepageInstance } from '../../../Objs/Homepage/HomepageObjClass'

export const MetaNavigation = connect(function MetaNavigation({
  root,
  widget,
}: {
  root: HomepageInstance
  widget: NavigationWidgetInstance
}) {
  const sitePortalOverviewPage = root.get('sitePortalOverviewPage')
  const showPortalNav = !!sitePortalOverviewPage

  const siteUserProfilePage = root.get('siteUserProfilePage')
  const showUserProfileLink = !!siteUserProfilePage

  const siteCartPage = root.get('siteCartPage')
  const showCart = !!siteCartPage && containsItems()

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
          {showCart && (
            <Nav.Item>
              <Nav.Link
                as={LinkTag}
                eventKey={`MetaNavigation-${siteCartPage.id()}`}
                key={`MetaNavigation-${siteCartPage.id()}`}
                to={siteCartPage}
              >
                <ObjIconAndTitle obj={siteCartPage} />{' '}
                <span className="badge rounded-pill text-bg-secondary">
                  {numberOfCartItems()}
                </span>
              </Nav.Link>
            </Nav.Item>
          )}
          {isUserLoggedIn() ? (
            <>
              <Nav.Item>
                <Nav.Link
                  active={isCurrentPage(sitePortalOverviewPage)}
                  as={LinkTag}
                  eventKey={`MetaNavigation-${sitePortalOverviewPage.id()}`}
                  key={`MetaNavigation-${sitePortalOverviewPage.id()}`}
                  to={sitePortalOverviewPage}
                >
                  <ObjIconAndTitle obj={sitePortalOverviewPage} />
                </Nav.Link>
              </Nav.Item>
              <NavDropdown
                title={
                  <>
                    <ProfileImg />
                    <span className="nav-link-extended">
                      <ContentTag
                        content={widget}
                        attribute="metaNavigationUserTitle"
                        tag="span"
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
                      active={isCurrentPage(siteUserProfilePage)}
                      as={LinkTag}
                      eventKey={`MetaNavigation-${siteUserProfilePage.id()}`}
                      key={`MetaNavigation-${siteUserProfilePage.id()}`}
                      to={siteUserProfilePage}
                    >
                      <ObjIconAndTitle obj={siteUserProfilePage} />
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
                active={isCurrentPage(sitePortalOverviewPage)}
                as={LinkTag}
                eventKey={`MetaNavigation-${sitePortalOverviewPage.id()}`}
                key={`MetaNavigation-${sitePortalOverviewPage.id()}`}
                to={sitePortalOverviewPage}
              >
                <ObjIconAndTitle obj={sitePortalOverviewPage} />
              </Nav.Link>
            </Nav.Item>
          )}
        </Nav>
      )}
    </div>
  )
})

const ProfileImg = connect(function ProfileImg() {
  const picture = ensureString(CurrentUserDataItem.get('picture'))

  if (!picture) {
    return <i className="bi bi-person-circle" aria-hidden="true"></i>
  }

  return (
    <>
      <img className="profile-img" src={picture} aria-hidden="true" />{' '}
    </>
  )
})
