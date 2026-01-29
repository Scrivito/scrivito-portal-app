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
import { applyPadding } from '../propertiesGroups/padding/applyPadding'

provideComponent(ImageWidget, ({ widget }) => {
  const classNames = ['image-widget']
  const alignment = alignmentClassName(widget.get('alignment'))
  if (alignment) classNames.push(alignment)

  let style: CSSProperties | undefined
  const height = widget.get('height')
  if (height) style = { ...style, height }
  const width = widget.get('width')
  if (width) style = { ...style, width }
  const objectFit = widget.get('objectFit')
  if (height && objectFit === 'cover') style = { ...style, objectFit }

  return (
    <WidgetTag className={classNames.join(' ')} style={applyPadding(widget)}>
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
