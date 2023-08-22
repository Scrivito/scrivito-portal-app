import * as Scrivito from 'scrivito'
import { alignmentClassName } from '../../utils/alignmentClassName'
import { ImageWidget } from './ImageWidgetClass'

Scrivito.provideComponent(ImageWidget, ({ widget }) => {
  let image = (
    <Scrivito.ImageTag
      alt={alternativeText(widget)}
      attribute="image"
      content={widget}
    />
  )

  const link = widget.get('link')
  if (link && !Scrivito.isInPlaceEditingActive()) {
    image = <Scrivito.LinkTag to={link}>{image}</Scrivito.LinkTag>
  }

  return (
    <div className={alignmentClassName(widget.get('alignment'))}>{image}</div>
  )
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
