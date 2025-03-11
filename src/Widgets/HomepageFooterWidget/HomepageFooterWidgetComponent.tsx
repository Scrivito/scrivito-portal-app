import { ContentTag, InPlaceEditingOff, Obj, provideComponent } from 'scrivito'
import { HomepageFooterWidget } from './HomepageFooterWidgetClass'
import { isHomepage } from '../../Objs/Homepage/HomepageObjClass'

provideComponent(HomepageFooterWidget, ({ widget }) => {
  const root = Obj.root()
  if (!isHomepage(root)) return null
  if (widget.obj().id() === root.id()) return null // Prevents endless recursion

  return (
    <InPlaceEditingOff>
      <ContentTag content={root} attribute="layoutFooter" />
    </InPlaceEditingOff>
  )
})
