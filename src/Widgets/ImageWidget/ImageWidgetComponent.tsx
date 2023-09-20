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
} from 'scrivito'
import { alignmentClassName } from '../../utils/alignmentClassName'
import { ImageWidget } from './ImageWidgetClass'

provideComponent(ImageWidget, ({ widget }) => {
  const dataItem = useDataItem()
  let image: JSX.Element | null = null
  const alt = alternativeText(widget)

  if (widget.get('imageFromDataItem')) {
    const src = dataItem?.get(widget.get('dataItemAttributeName'))
    if (typeof src === 'string' && !!src) {
      image = <img src={src} alt={alt} />
    }
  } else {
    image = <ImageTag alt={alt} attribute="image" content={widget} />
  }

  return (
    <div className={alignmentClassName(widget.get('alignment'))}>
      <LinkWrapper link={widget.get('link')}>{image}</LinkWrapper>
    </div>
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
