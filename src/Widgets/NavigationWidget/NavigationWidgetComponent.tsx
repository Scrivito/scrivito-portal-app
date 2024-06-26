import { provideComponent, Obj, currentPage } from 'scrivito'
import Navbar from 'react-bootstrap/Navbar'

import { NavigationWidget } from './NavigationWidgetClass'
import { Brand } from './SubComponents/Brand'
import { MainNavigation } from './SubComponents/MainNavigation'
import { MetaNavigation } from './SubComponents/MetaNavigation'
import { isHomepage } from '../../Objs/Homepage/HomepageObjClass'

provideComponent(NavigationWidget, ({ widget }) => {
  const root = Obj.root()
  if (!isHomepage(root)) return null

  if (currentPage()?.get('showAsLandingPage')) {
    return (
      <section className="bg-primary pb-4">
        <div className="container">
          <Navbar expand="lg" collapseOnSelect>
            <Brand root={root} linkClassName="navbar-brand m-auto pt-3" />
          </Navbar>
        </div>
      </section>
    )
  }

  return (
    <section className={widget.get('slimDesign') ? 'slim-nav' : ''}>
      <div className="container">
        <Navbar expand="lg" collapseOnSelect>
          <Brand root={root} linkClassName="navbar-brand" />
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <MetaNavigation widget={widget} root={root} />
            {!widget.get('slimDesign') && <MainNavigation root={root} />}
          </Navbar.Collapse>
        </Navbar>
      </div>
    </section>
  )
})
