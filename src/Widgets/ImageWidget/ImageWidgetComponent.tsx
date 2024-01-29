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
  DataItem,
} from 'scrivito'
import { alignmentClassName } from '../../utils/alignmentClassName'
import { ImageWidget, ImageWidgetInstance } from './ImageWidgetClass'
import './ImageWidget.scss'
import { ensureString } from '../../utils/ensureString'
import { isDataBinary } from '../../utils/dataBinaryToUrl'
import { DataBinaryImage } from '../../Components/DataBinaryImage'

provideComponent(ImageWidget, ({ widget }) => {
  const dataItem = useDataItem()

  const classNames = ['image-widget']
  const alignment = alignmentClassName(widget.get('alignment'))
  if (alignment) classNames.push(alignment)

  return (
    <WidgetTag className={classNames.join(' ')}>
      <LinkWrapper link={widget.get('link')}>
        <ImageComponent widget={widget} dataItem={dataItem} />
      </LinkWrapper>
    </WidgetTag>
  )
})

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

const ImageComponent = connect(function ImageComponent({
  dataItem,
  widget,
}: {
  dataItem?: DataItem
  widget: ImageWidgetInstance
}) {
  const widgetAlternativeText = widget.get('alternativeText')
  const className = widget.get('roundCorners') ? 'rounded-corners' : undefined

  if (!widget.get('imageFromDataItem')) {
    return (
      <ImageTag
        alt={
          widgetAlternativeText || alternativeTextFromObj(widget.get('image'))
        }
        className={className}
        attribute="image"
        content={widget}
      />
    )
  }

  if (!dataItem) return null
  const attributeName = widget.get('attributeName')
  if (!attributeName) return null

  const objValue = dataItem.obj()?.get(attributeName)
  if (objValue instanceof Obj) {
    return (
      <ImageTag
        content={objValue}
        alt={widgetAlternativeText || alternativeTextFromObj(objValue)}
        className={className}
      />
    )
  }

  const attributeValue = dataItem.get(attributeName)
  if (isDataBinary(attributeValue)) {
    return (
      <DataBinaryImage
        dataBinary={attributeValue}
        alt={widgetAlternativeText}
        className={className}
      />
    )
  }

  if (typeof attributeValue !== 'string') return null

  return (
    <img
      src={attributeValue}
      alt={widgetAlternativeText}
      className={className}
    />
  )
})

function alternativeTextFromObj(image: Obj | null): string {
  return ensureString(image?.get('alternativeText'))
}
