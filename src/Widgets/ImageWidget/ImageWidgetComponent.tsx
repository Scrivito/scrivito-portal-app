import {
  provideComponent,
  ImageTag,
  isInPlaceEditingActive,
  LinkTag,
  Widget,
  Obj,
  connect,
  Link,
  useDataItem,
  WidgetTag,
} from 'scrivito'
import { alignmentClassName } from '../../utils/alignmentClassName'
import { ImageWidget } from './ImageWidgetClass'
import './ImageWidget.scss'

provideComponent(ImageWidget, ({ widget }) => {
  const dataItem = useDataItem()
  let image: JSX.Element | null = null
  const alt = alternativeText(widget)

  const imgClassName = widget.get('roundCorners')
    ? 'rounded-corners'
    : undefined

  if (widget.get('imageFromDataItem')) {
    const src = dataItem?.get(widget.get('dataItemAttributeName'))
    if (typeof src === 'string' && !!src) {
      image = <img src={src} alt={alt} className={imgClassName} />
    }
  } else {
    image = (
      <ImageTag
        alt={alt}
        className={imgClassName}
        attribute="image"
        content={widget}
      />
    )
  }

  return (
    <WidgetTag
      className={`image-widget ${alignmentClassName(widget.get('alignment'))}`}
    >
      <LinkWrapper link={widget.get('link')}>{image}</LinkWrapper>
    </WidgetTag>
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

const LinkWrapper = connect(function LinkWrapper({
  link,
  children,
}: {
  link: Link | null
  children: React.ReactNode
}) {
  if (isInPlaceEditingActive()) return children
  if (!link) return children

  return <LinkTag to={link}>{children}</LinkTag>
})
