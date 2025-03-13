import { provideComponent, Obj, WidgetTag } from 'scrivito'
import Navbar from 'react-bootstrap/Navbar'

import { TopNavigationWidget } from './TopNavigationWidgetClass'
import { Brand } from './SubComponents/Brand'
import { MainNavigation } from './SubComponents/MainNavigation'
import { MetaNavigation } from './SubComponents/MetaNavigation'
import { isHomepage } from '../../Objs/Homepage/HomepageObjClass'
import './TopNavigationWidget.scss'

provideComponent(TopNavigationWidget, ({ widget }) => {
  const root = Obj.root()
  if (!isHomepage(root)) return null

  const classNames = ['top-navigation-widget']

  if (widget.get('slimDesign')) classNames.push('slim-nav')

  return (
    <WidgetTag tag="section" className={classNames.join(' ')}>
      <div className="container">
        <Navbar expand="lg" collapseOnSelect>
          <Brand
            root={root}
            linkTo={widget.get('brandLink') || root}
            linkClassName="navbar-brand"
          />
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <MetaNavigation widget={widget} root={root} />
            {!widget.get('slimDesign') && <MainNavigation root={root} />}
          </Navbar.Collapse>
        </Navbar>
      </div>
    </WidgetTag>
  )
})
