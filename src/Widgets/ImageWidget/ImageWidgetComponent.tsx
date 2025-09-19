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

  let style: CSSProperties | undefined
  const height = widget.get('height')
  const heightTablet = widget.get('heightTablet') || height
  const heightMobile = widget.get('heightMobile') || height

  if (heightTablet === heightMobile && heightTablet === height) {
    if (height) style = { ...style, height: height }
  } else {
    style = {
      ...style,
      height: heightMobile,
      '--height-tablet': heightTablet,
      '--height-desktop': height,
    } as CSSProperties
    classNames.push('has-responsive-height')
  }

  const width = widget.get('width')
  const widthTablet = widget.get('widthTablet') || width
  const widthMobile = widget.get('widthMobile') || width

  if (widthTablet === widthMobile && widthTablet === width) {
    if (width) style = { ...style, width: width }
  } else {
    style = {
      ...style,
      width: widthMobile,
      '--width-tablet': widthTablet,
      '--width-desktop': width,
    } as CSSProperties
    classNames.push('has-responsive-width')
  }
  const objectFit = widget.get('objectFit')
  if (height && objectFit === 'cover') style = { ...style, objectFit }

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
