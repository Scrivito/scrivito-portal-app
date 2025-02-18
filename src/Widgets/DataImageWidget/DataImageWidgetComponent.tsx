import {
  provideComponent,
  isInPlaceEditingActive,
  LinkTag,
  connect,
  Link,
  useData,
  WidgetTag,
  ImageTag,
  InPlaceEditingOff,
  DataItem,
} from 'scrivito'
import { alignmentClassName } from '../../utils/alignmentClassName'
import {
  DataImageWidget,
  DataImageWidgetInstance,
} from './DataImageWidgetClass'
import { isDataBinary } from '../../utils/dataBinaryToUrl'
import { DataBinaryImage } from '../../Components/DataBinaryImage'

provideComponent(DataImageWidget, ({ widget }) => {
  const classNames = ['image-widget']
  const alignment = alignmentClassName(widget.get('alignment'))
  if (alignment) classNames.push(alignment)

  return (
    <WidgetTag className={classNames.join(' ')}>
      <LinkWrapper link={widget.get('link')}>
        <ImageComponent widget={widget} />
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
  widget,
}: {
  widget: DataImageWidgetInstance
}) {
  const className = widget.get('roundCorners') ? 'rounded' : undefined

  const dataItemAttribute = useData().dataItemAttribute()
  if (!dataItemAttribute) return null

  const objValue = dataItemAttribute.dataItem().obj()
  if (objValue) {
    return (
      <InPlaceEditingOff>
        <ImageTag
          content={objValue}
          attribute={dataItemAttribute.attributeName()}
          className={className}
          alt=""
        />
      </InPlaceEditingOff>
    )
  }

  const attributeValue = dataItemAttribute.get()
  if (attributeValue instanceof DataItem) {
    const content = attributeValue.obj()
    if (!content) return null

    return <ImageTag content={content} className={className} alt="" />
  }

  if (isDataBinary(attributeValue)) {
    return <DataBinaryImage dataBinary={attributeValue} className={className} />
  }

  if (typeof attributeValue !== 'string') return null

  return <img src={attributeValue} className={className} alt="" />
})
