import { connect, isCurrentPage, LinkTag } from 'scrivito'
import { NavigationWidgetInstance } from '../NavigationWidgetClass'
import { NavItem } from './NavItem'
import Nav from 'react-bootstrap/Nav'
import { ObjIconAndTitle } from '../../../Components/ObjIconAndTitle'
import { containsItems, numberOfCartItems } from '../../../Data/CartItem/Cart'
import { HomepageInstance } from '../../../Objs/Homepage/HomepageObjClass'
import { CurrentUserDropdown } from './CurrentUserDropdown'
import { LanguageSwitch } from './LanguageSwitch'
import { getSitePortalOverviewPage } from '../../../utils/getSitePortalOverviewPage'

export const MetaNavigation = connect(function MetaNavigation({
  root,
  widget,
}: {
  root: HomepageInstance
  widget: NavigationWidgetInstance
}) {
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

      <Nav className="ms-auto border-left">
        <LanguageSwitch />
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
        <PortalLink widget={widget} root={root} />
        <CurrentUserDropdown widget={widget} root={root} />
      </Nav>
    </div>
  )
})

const PortalLink = connect(function PortalLink({
  root,
  widget,
}: {
  root: HomepageInstance
  widget: NavigationWidgetInstance
}) {
  if (widget.get('slimDesign')) return null

  const sitePortalOverviewPage = getSitePortalOverviewPage(root)
  if (!sitePortalOverviewPage) return null

  return (
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
  )
})
