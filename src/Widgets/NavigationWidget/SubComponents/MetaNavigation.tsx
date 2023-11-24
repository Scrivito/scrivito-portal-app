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
import { containsItems } from '../../../Data/CartItem/Cart'
import { ensureString } from '../../../utils/ensureString'

export const MetaNavigation = connect(function MetaNavigation({
  widget,
}: {
  widget: NavigationWidgetInstance
}) {
  const metaNavigationPortalOverview = widget.get(
    'metaNavigationPortalOverview',
  )
  const showPortalNav = !!metaNavigationPortalOverview

  const metaNavigationUserProfile = widget.get('metaNavigationUserProfile')
  const showUserProfileLink = !!metaNavigationUserProfile

  const metaNavigationCart = widget.get('metaNavigationCart')
  const showCart = !!metaNavigationCart && containsItems()

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
                eventKey={`MetaNavigation-${metaNavigationCart.id()}`}
                key={`MetaNavigation-${metaNavigationCart.id()}`}
                to={metaNavigationCart}
              >
                <ObjIconAndTitle obj={metaNavigationCart} />
              </Nav.Link>
            </Nav.Item>
          )}
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
