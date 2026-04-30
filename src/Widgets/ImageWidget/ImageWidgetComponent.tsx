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
  let style: CSSProperties | undefined
  const height = widget.get('height')
  if (height) style = { ...style, height }
  const width = widget.get('width')
  if (width) style = { ...style, width }
  if (height) {
    const objectFit = widget.get('objectFit') === 'cover' ? 'cover' : 'contain'
    style = { ...style, objectFit }
  }

  // `inline-block` undoes Tailwind Preflight's `img { display: block }`
  // so the parent's `text-center` / `text-end` aligns the image.
  const classNames = ['inline-block']
  if (widget.get('roundCorners')) classNames.push('rounded-portal')

  return (
    <WidgetTag className={alignmentClassName(widget.get('alignment'))}>
      <LinkWrapper link={widget.get('link')}>
        <ImageTag
          alt={
            widget.get('alternativeText') ||
            alternativeTextForObj(widget.get('image'))
          }
          className={classNames.join(' ')}
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
