import { connect, isCurrentPage, LinkTag } from 'scrivito'
import { NavigationWidgetInstance } from '../NavigationWidgetClass'
import { NavItem } from './NavItem'
import Nav from 'react-bootstrap/Nav'
import { ObjIconAndTitle } from '../../../Components/ObjIconAndTitle'
import { containsItems, numberOfCartItems } from '../../../Data/CartItem/Cart'
import { HomepageInstance } from '../../../Objs/Homepage/HomepageObjClass'
import { CurrentUserDropdown } from './CurrentUserDropdown'
import { SearchBox } from './SearchBox'

export const MetaNavigation = connect(function MetaNavigation({
  root,
  widget,
}: {
  root: HomepageInstance
  widget: NavigationWidgetInstance
}) {
  const sitePortalOverviewPage = root.get('sitePortalOverviewPage')
  const showPortalNav = !!sitePortalOverviewPage

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
          <CurrentUserDropdown widget={widget} root={root} />
        </Nav>
      )}
      <SearchBox searchResultsPage={root.get('siteSearchResultsPage')} />
    </div>
  )
})
