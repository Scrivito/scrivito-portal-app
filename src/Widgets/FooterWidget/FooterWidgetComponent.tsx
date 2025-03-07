import { ContentTag, InPlaceEditingOff, Obj, provideComponent } from 'scrivito'
import { FooterWidget } from './FooterWidgetClass'
import { isHomepage } from '../../Objs/Homepage/HomepageObjClass'

provideComponent(FooterWidget, () => {
  const root = Obj.root()
  if (!isHomepage(root)) return null
  if (!root.get('layoutShowFooter')) return null

  return (
    <InPlaceEditingOff>
      <ContentTag content={root} attribute="layoutFooter" />
    </InPlaceEditingOff>
  )
})
