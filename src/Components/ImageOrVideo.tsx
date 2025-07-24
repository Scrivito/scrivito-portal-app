import { connect, Widget, InPlaceEditingOff, ImageTag } from 'scrivito'

export const ImageOrVideo = connect(function ImageOrVideo<T extends string>({
  attribute,
  className,
  widget,
}: {
  attribute: T
  className?: string
  widget: Widget<{
    [K in T]: 'reference'
  }>
}) {
  const background = widget.get(attribute)
  if (!background) return null

  const classNames = ['img-background']
  if (className) classNames.push(className)

  if (background.contentType().startsWith('video/')) {
    return (
      <video
        autoPlay
        className={classNames.join(' ')}
        key={background.contentUrl()}
        loop
        muted
        playsInline
        src={background.contentUrl()}
      />
    )
  }

  return (
    <InPlaceEditingOff>
      <ImageTag
        content={widget}
        attribute={attribute}
        className={classNames.join(' ')}
        alt=""
      />
    </InPlaceEditingOff>
  )
})
