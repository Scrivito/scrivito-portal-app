import { Obj, provideComponent, WidgetTag } from 'scrivito'
import { LogoWidget } from './LogoWidgetClass'
import { isHomepage } from '../../Objs/Homepage/HomepageObjClass'
import { Brand } from '../TopNavigationWidget/SubComponents/Brand'

provideComponent(LogoWidget, ({ widget }) => {
  const root = Obj.root()
  if (!isHomepage(root)) return null

  return (
    <WidgetTag className="d-flex pb-4">
      <Brand
        root={root}
        linkTo={widget.get('brandLink')}
        linkClassName="navbar-brand m-auto pt-3"
      />
    </WidgetTag>
  )
})
