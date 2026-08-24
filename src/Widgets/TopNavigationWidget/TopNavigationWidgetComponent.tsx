import { provideComponent, Obj, WidgetTag } from 'scrivito'
import { Navbar } from 'react-bootstrap'

import { TopNavigationWidget } from './TopNavigationWidgetClass'
import { Brand } from './SubComponents/Brand'
import { MainNavigation } from './SubComponents/MainNavigation'
import { MetaNavigation } from './SubComponents/MetaNavigation'
import { isHomepage } from '../../Objs/Homepage/HomepageObjClass'

provideComponent(TopNavigationWidget, ({ widget }) => {
  const root = Obj.root()
  if (!isHomepage(root)) return null

  const classNames = ['z-[3]']

  if (widget.get('slimDesign')) {
    classNames.push('slim-nav')
  } else {
    // two color top navbar
    classNames.push(
      "after:pointer-events-none after:absolute after:inset-x-0 after:top-0 after:-z-[1] after:block after:h-[38px] after:bg-portal-light-grey after:content-['']",
    )
  }

  return (
    <WidgetTag tag="section" className={classNames.join(' ')}>
      <div className="container">
        <Navbar className="flex max-lg:flex-wrap" expand="lg" collapseOnSelect>
          <Brand
            root={root}
            linkTo={widget.get('brandLink') || root}
            linkClassName="navbar-brand"
          />
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse
            className="flex basis-full flex-col max-lg:flex-col-reverse"
            id="basic-navbar-nav"
          >
            <MetaNavigation widget={widget} root={root} />
            {!widget.get('slimDesign') && <MainNavigation root={root} />}
          </Navbar.Collapse>
        </Navbar>
      </div>
    </WidgetTag>
  )
})
