import { provideComponent, Obj } from 'scrivito'
import Navbar from 'react-bootstrap/Navbar'

import { NavigationWidget } from './NavigationWidgetClass'
import { Brand } from './SubComponents/Brand'
import { MainNavigation } from './SubComponents/MainNavigation'
import { MetaNavigation } from './SubComponents/MetaNavigation'

provideComponent(NavigationWidget, ({ widget }) => {
  const root = Obj.root()
  if (!root) return null

  return (
    <Navbar expand="lg" collapseOnSelect>
      <Brand root={root} />
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <MetaNavigation widget={widget} />
        <MainNavigation
          root={root}
          searchResultsPage={widget.get('metaNavigationSearchResultsPage')}
        />
      </Navbar.Collapse>
    </Navbar>
  )
})
