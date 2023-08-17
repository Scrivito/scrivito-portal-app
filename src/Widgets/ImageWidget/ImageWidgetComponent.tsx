import {
  provideComponent,
  ImageTag,
  isInPlaceEditingActive,
  LinkTag,
  Widget,
  Obj,
} from 'scrivito'
import { ImageWidget } from './ImageWidgetClass'

provideComponent(ImageWidget, ({ widget }) => {
  let image = (
    <ImageTag
      alt={alternativeText(widget)}
      attribute="image"
      content={widget}
    />
  )

  const link = widget.get('link')
  if (link && !isInPlaceEditingActive()) {
    image = <LinkTag to={link}>{image}</LinkTag>
  }

  return (
    <div className={alignmentClassName(widget.get('alignment'))}>{image}</div>
  )
})

function alternativeText(widget: Widget): string {
  const widgetAlternativeText = widget.get('alternativeText')
  if (typeof widgetAlternativeText === 'string' && widgetAlternativeText) {
    return widgetAlternativeText
  }

  const image = widget.get('image')
  if (image instanceof Obj) {
    const imageAlternativeText = image.get('alternativeText')
    if (typeof imageAlternativeText === 'string') return imageAlternativeText
  }

  return ''
}

function alignmentClassName(
  widgetAlignment: string | null
): string | undefined {
  if (widgetAlignment === 'center') return 'text-center'
  if (widgetAlignment === 'right') return 'text-end'
}
