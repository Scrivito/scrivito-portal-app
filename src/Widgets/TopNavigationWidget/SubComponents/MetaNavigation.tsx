import { connect, isCurrentPage, LinkTag, Obj } from 'scrivito'
import { TopNavigationWidgetInstance } from '../TopNavigationWidgetClass'
import { NavItem } from './NavItem'
import Nav from 'react-bootstrap/Nav'
import { ObjIconAndTitle } from '../../../Components/ObjIconAndTitle'
import { containsItems, numberOfCartItems } from '../../../Data/CartItem/Cart'
import { HomepageInstance } from '../../../Objs/Homepage/HomepageObjClass'
import { CurrentUserDropdown } from './CurrentUserDropdown'
import { LanguageSwitch } from './LanguageSwitch'
import { isRedirect } from '../../../Objs/Redirect/RedirectObjClass'

export const MetaNavigation = connect(function MetaNavigation({
  root,
  widget,
}: {
  root: HomepageInstance
  widget: TopNavigationWidgetInstance
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
        <ProminentPageLink target={widget.get('metaNavigationProminentPage')} />
        <CurrentUserDropdown widget={widget} root={root} />
      </Nav>
    </div>
  )
})

const ProminentPageLink = connect(function ProminentPageLink({
  target,
}: {
  target: Obj | null
}) {
  if (!target) return null
  const page = (isRedirect(target) && target.get('link')?.obj()) || target

  return (
    <Nav.Item>
      <Nav.Link
        active={isCurrentPage(page)}
        as={LinkTag}
        eventKey={`MetaNavigation-${page.id()}`}
        key={`MetaNavigation-${page.id()}`}
        to={page}
      >
        <ObjIconAndTitle obj={page} />
      </Nav.Link>
    </Nav.Item>
  )
})
