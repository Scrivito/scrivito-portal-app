import { connect, ChildListTag } from 'scrivito'
import Nav from 'react-bootstrap/Nav'
import { NavItem as NavItem } from './NavItem'
import { SearchBox } from './SearchBox'
import { HomepageInstance } from '../../../Objs/Homepage/HomepageObjClass'
import { NavigationWidgetInstance } from '../NavigationWidgetClass'

export const MainNavigation = connect(function MainNavigation({
  root,
  searchInputLabel,
  widget,
}: {
  root: HomepageInstance
  searchInputLabel: string
  widget: NavigationWidgetInstance
}) {
  if (widget.get('slimDesign')) return null

  return (
    <Nav className="navbar-main">
      <ChildListTag
        className="navbar-nav me-auto mb-2 mb-md-0"
        tag="div"
        parent={root}
        renderChild={(child) => (
          <NavItem
            obj={child}
            eventKey={`MainNavigation-${root.id()}-${child.id()}`}
            key={`MainNavigation-${root.id()}-${child.id()}`}
          />
        )}
      />
      <SearchBox
        searchInputLabel={searchInputLabel}
        searchResultsPage={root.get('siteSearchResultsPage')}
      />
    </Nav>
  )
})
