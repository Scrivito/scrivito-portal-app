import * as Scrivito from 'scrivito'
import { ImageWidget } from './ImageWidgetClass'

Scrivito.provideComponent(ImageWidget, ({ widget }) => {
  let image = (
    <Scrivito.ImageTag
      content={widget}
      attribute="image"
      alt={alternativeText(widget)}
    />
  )

  const link = widget.get('link')
  if (link && !Scrivito.isInPlaceEditingActive()) {
    return <Scrivito.LinkTag to={link}>{image}</Scrivito.LinkTag>
  }
  return image
})

function alternativeText(widget: Scrivito.Widget): string {
  const widgetAlternativeText = widget.get('alternativeText')
  if (typeof widgetAlternativeText === 'string' && widgetAlternativeText) {
    return widgetAlternativeText
  }

  const image = widget.get('image')
  if (image instanceof Scrivito.Obj) {
    const imageAlternativeText = image.get('alternativeText')
    if (typeof imageAlternativeText === 'string') return imageAlternativeText
  }

  return ''
}
