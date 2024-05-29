import {
  provideComponent,
  isInPlaceEditingActive,
  LinkTag,
  connect,
  Link,
  useData,
  WidgetTag,
  DataScope,
  Obj,
  ImageTag,
  InPlaceEditingOff,
} from 'scrivito'
import { alignmentClassName } from '../../utils/alignmentClassName'
import {
  DataImageWidget,
  DataImageWidgetInstance,
} from './DataImageWidgetClass'
import { isDataBinary } from '../../utils/dataBinaryToUrl'
import { DataBinaryImage } from '../../Components/DataBinaryImage'

provideComponent(DataImageWidget, ({ widget }) => {
  const dataScope = useData()

  const classNames = ['image-widget']
  const alignment = alignmentClassName(widget.get('alignment'))
  if (alignment) classNames.push(alignment)

  return (
    <WidgetTag className={classNames.join(' ')}>
      <LinkWrapper link={widget.get('link')}>
        <ImageComponent widget={widget} dataScope={dataScope} />
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
  dataScope,
  widget,
}: {
  dataScope: DataScope
  widget: DataImageWidgetInstance
}) {
  const className = widget.get('roundCorners') ? 'rounded' : undefined

  const dataItemAttribute = dataScope.dataItemAttribute()
  if (!dataItemAttribute) return null

  const objValue = dataItemAttribute.dataItem().obj()
  if (objValue instanceof Obj) {
    return (
      <InPlaceEditingOff>
        <ImageTag
          content={objValue}
          attribute={dataItemAttribute.attributeName()}
          className={className}
        />
      </InPlaceEditingOff>
    )
  }

  const attributeValue = dataItemAttribute.get()
  if (isDataBinary(attributeValue)) {
    return <DataBinaryImage dataBinary={attributeValue} className={className} />
  }

  if (typeof attributeValue !== 'string') return null

  return <img src={attributeValue} className={className} />
})
