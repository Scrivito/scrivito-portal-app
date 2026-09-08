import { connect, isCurrentPage, LinkTag, Obj } from 'scrivito'
import { TopNavigationWidgetInstance } from '../TopNavigationWidgetClass'
import { NavItem } from './NavItem'
import { Nav } from 'react-bootstrap'
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
  const itemsCount = showCart && numberOfCartItems()

  return (
    <div className="navbar-meta flex w-full max-lg:mt-3 max-lg:flex-col">
      <Nav className="flex max-lg:flex-col lg:me-auto">
        {widget.get('metaNavigationObjs').map((metaObj, index) => (
          <NavItem
            obj={metaObj}
            eventKey={`${metaObj.id()}${index}`}
            key={`${metaObj.id()}${index}`}
          />
        ))}
      </Nav>

      <Nav className="border-left flex max-lg:flex-col">
        <LanguageSwitch align="start" />
        {showCart && (
          <Nav.Item>
            <Nav.Link
              as={LinkTag}
              eventKey={`MetaNavigation-${siteCartPage.id()}`}
              key={`MetaNavigation-${siteCartPage.id()}`}
              to={siteCartPage}
            >
              <ObjIconAndTitle obj={siteCartPage} />{' '}
              {itemsCount && (
                <span className="bg-portal-secondary text-on-portal-secondary inline-block rounded-full px-[0.65em] py-[0.35em] text-center align-baseline text-[0.75em] leading-none font-bold whitespace-nowrap">
                  {itemsCount}
                </span>
              )}
            </Nav.Link>
          </Nav.Item>
        )}
        <UtilityLink target={widget.get('metaNavigationUtilityLink')} />
        <CurrentUserDropdown widget={widget} root={root} />
      </Nav>
    </div>
  )
})

const UtilityLink = connect(function UtilityLink({
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
