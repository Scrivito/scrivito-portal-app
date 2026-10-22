import {
  provideComponent,
  isInPlaceEditingActive,
  LinkTag,
  connect,
  designTagProps,
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
  // The design goes on the image, not on the widget: size, object fit and corners are
  // properties of the image, and the widget is only what positions it.
  const design = designTagProps(widget)

  const dataItemAttribute = useData().dataItemAttribute()
  if (!dataItemAttribute) return null

  const objValue = dataItemAttribute.dataItem().obj()
  if (objValue) {
    return (
      <InPlaceEditingOff>
        <ImageTag
          {...design}
          content={objValue}
          attribute={dataItemAttribute.attributeName()}
          alt=""
        />
      </InPlaceEditingOff>
    )
  }

  const attributeValue = dataItemAttribute.get()
  if (attributeValue instanceof DataItem) {
    const content = attributeValue.obj()
    if (!content) return null

    return <ImageTag {...design} content={content} alt="" />
  }

  if (isDataBinary(attributeValue)) {
    return <DataBinaryImage {...design} dataBinary={attributeValue} />
  }

  if (typeof attributeValue !== 'string') return null
  if (!attributeValue) return null

  return <img {...design} src={attributeValue} alt="" />
})
