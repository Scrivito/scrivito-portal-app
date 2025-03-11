import { ContentTag, InPlaceEditingOff, Obj, provideComponent } from 'scrivito'
import { FooterWidget } from './FooterWidgetClass'
import { isHomepage } from '../../Objs/Homepage/HomepageObjClass'

provideComponent(FooterWidget, ({ widget }) => {
  const root = Obj.root()
  if (!isHomepage(root)) return null
  if (widget.obj().id() === root.id()) return null // Prevents endless recursion

  return (
    <InPlaceEditingOff>
      <ContentTag content={root} attribute="layoutFooter" />
    </InPlaceEditingOff>
  )
})
