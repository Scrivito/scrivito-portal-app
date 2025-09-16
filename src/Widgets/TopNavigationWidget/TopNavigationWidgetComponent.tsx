import {
  provideComponent,
  Obj,
  WidgetTag,
  load,
  unstable_selectImageFromContentBrowser,
} from 'scrivito'
import { Navbar } from 'react-bootstrap'

import { TopNavigationWidget } from './TopNavigationWidgetClass'
import { Brand } from './SubComponents/Brand'
import { MainNavigation } from './SubComponents/MainNavigation'
import { MetaNavigation } from './SubComponents/MetaNavigation'
import { isHomepage } from '../../Objs/Homepage/HomepageObjClass'
import './TopNavigationWidget.scss'
import { useState } from 'react'

provideComponent(TopNavigationWidget, ({ widget }) => {
  const root = Obj.root()
  const [selected, setSelected] = useState<{
    selected: null | string
    url: null | string
  }>({ selected: null, url: null })
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
        <section>
          <button
            onClick={() => {
              console.log('Calling unstable_selectImageFromContentBrowser...')
              unstable_selectImageFromContentBrowser().then(
                async (selectedImage) => {
                  if (selectedImage) {
                    console.log('Selected Image ID:', selectedImage.id())
                    load(() => selectedImage.contentUrl()).then(
                      (contentUrl) => {
                        console.log('Selected Image Url:', contentUrl)
                        setSelected({
                          selected: selectedImage.id(),
                          url: contentUrl,
                        })
                      },
                    )
                  } else {
                    console.log('User cancelled selection')
                  }
                },
              )
            }}
          >
            Click to open DAM
          </button>
          <div>
            Selected: {selected.selected} @ {selected.url}
          </div>
        </section>
      </div>
    </WidgetTag>
  )
})
