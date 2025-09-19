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

  const rawAlignment = widget.get('alignment') || 'left'
  const rawAlignmentTablet = widget.get('alignmentTablet') || rawAlignment
  const rawAlignmentMobile = widget.get('alignmentMobile') || rawAlignment

  if (
    rawAlignment === rawAlignmentTablet &&
    rawAlignment === rawAlignmentMobile
  ) {
    const alignment = alignmentClassName(rawAlignment)
    if (alignment) classNames.push(alignment)
  } else {
    classNames.push(
      `text-lg-${normalizeAlignment(rawAlignment)}`,
      `text-md-${normalizeAlignment(rawAlignmentTablet)}`,
      `text-${normalizeAlignment(rawAlignmentMobile)}`,
    )
  }

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
  const objectFitTablet = widget.get('objectFitTablet') || objectFit
  const objectFitMobile = widget.get('objectFitMobile') || objectFit

  if (height) {
    if (objectFitTablet === objectFitMobile && objectFitTablet === objectFit) {
      if (objectFit === 'cover') style = { ...style, objectFit }
    } else {
      style = {
        ...style,
        objectFit: objectFitMobile === 'cover' ? 'cover' : 'contain',
        '--object-fit-tablet':
          objectFitTablet === 'cover' ? 'cover' : 'contain',
        '--object-fit-desktop': objectFit === 'cover' ? 'cover' : 'contain',
      } as CSSProperties
      classNames.push('has-responsive-object-fit')
    }
  }

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

function normalizeAlignment(alignment: string): 'start' | 'center' | 'end' {
  if (alignment === 'center') return 'center'
  if (alignment === 'right') return 'end'
  return 'start'
}
