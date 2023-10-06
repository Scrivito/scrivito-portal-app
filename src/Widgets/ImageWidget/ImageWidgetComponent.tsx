import {
  provideComponent,
  ImageTag,
  isInPlaceEditingActive,
  LinkTag,
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
  const widgetAlternativeText = widget.get('alternativeText')

  const imgClassName = widget.get('roundCorners')
    ? 'rounded-corners'
    : undefined

  if (widget.get('imageFromDataItem')) {
    const src = dataItem?.get(widget.get('attributeName'))
    if (typeof src === 'string' && !!src) {
      image = (
        <img src={src} alt={widgetAlternativeText} className={imgClassName} />
      )
    }
  } else {
    image = (
      <ImageTag
        alt={
          widgetAlternativeText || alternativeTextFromObj(widget.get('image'))
        }
        className={imgClassName}
        attribute="image"
        content={widget}
      />
    )
  }

  const classNames = ['image-widget']
  const alignment = alignmentClassName(widget.get('alignment'))
  if (alignment) classNames.push(alignment)

  return (
    <WidgetTag className={classNames.join(' ')}>
      <LinkWrapper link={widget.get('link')}>{image}</LinkWrapper>
    </WidgetTag>
  )
})

function alternativeTextFromObj(image: Obj | null): string {
  if (!image) return ''

  const alternativeText = image.get('alternativeText')
  if (typeof alternativeText !== 'string') return ''

  return alternativeText
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
