import * as Scrivito from 'scrivito'
import Navbar from 'react-bootstrap/Navbar'

import { NavigationWidget } from './NavigationWidgetClass'
import { Brand } from './SubComponents/Brand'
import { MainNavigation } from './SubComponents/MainNavigation'
import { MetaNavigation } from './SubComponents/MetaNavigation'

Scrivito.provideComponent(NavigationWidget, ({ widget }) => {
  const root = Scrivito.Obj.root()
  if (!root) return null

  return (
    <Navbar expand="lg" collapseOnSelect={true}>
      <Brand root={root} />
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <MetaNavigation widget={widget} />
        <MainNavigation root={root} />
      </Navbar.Collapse>
    </Navbar>
  )
})
