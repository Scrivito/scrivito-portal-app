import {
  provideComponent,
  ImageTag,
  isInPlaceEditingActive,
  LinkTag,
  connect,
  designProps,
  Link,
  WidgetTag,
} from 'scrivito'
import { alignmentClassName } from '../../utils/alignmentClassName'
import { ImageWidget } from './ImageWidgetClass'
import { alternativeTextForObj } from '../../utils/alternativeTextForObj'

provideComponent(ImageWidget, ({ widget }) => {
  const classNames = ['image-widget']
  const alignment = alignmentClassName(widget.get('alignment'))
  if (alignment) classNames.push(alignment)

  return (
    <WidgetTag className={classNames.join(' ')}>
      <LinkWrapper link={widget.get('link')}>
        {/* The design goes on the image, not on the widget: size, object fit and corners are
            properties of the image, and the widget is only what positions it. */}
        <ImageTag
          {...designProps(widget.get('design'))}
          alt={
            widget.get('alternativeText') ||
            alternativeTextForObj(widget.get('image'))
          }
          attribute="image"
          content={widget}
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
