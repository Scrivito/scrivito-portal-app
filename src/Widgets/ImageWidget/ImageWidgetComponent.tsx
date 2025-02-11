import {
  provideComponent,
  ImageTag,
  isInPlaceEditingActive,
  LinkTag,
  connect,
  Link,
  WidgetTag,
} from 'scrivito'
import { alignmentClassName } from '../../utils/alignmentClassName'
import { ImageWidget } from './ImageWidgetClass'
import { alternativeTextForObj } from '../../utils/alternativeTextForObj'
import { CSSProperties } from 'react'

provideComponent(ImageWidget, ({ widget }) => {
  const classNames = ['image-widget']
  const alignment = alignmentClassName(widget.get('alignment'))
  if (alignment) classNames.push(alignment)

  const height = widget.get('height')
  const width = widget.get('width')

  let style: CSSProperties | undefined = height ? { height } : undefined
  if (width) style = { ...style, width }

  return (
    <WidgetTag className={classNames.join(' ')}>
      <LinkWrapper link={widget.get('link')}>
        <ImageTag
          alt={
            widget.get('alternativeText') ||
            alternativeTextForObj(widget.get('image'))
          }
          className={widget.get('roundCorners') ? 'rounded' : undefined}
          attribute="image"
          content={widget}
          style={style}
        />
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
