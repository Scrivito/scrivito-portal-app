import { connect, ImageTag, InPlaceEditingOff, Obj, Widget } from 'scrivito'

export const ImageOrVideo = connect(function ImageOrVideo({
  widget,
  backgroundImage,
  backgroundImageClassNames,
}: {
  widget: Widget
  backgroundImage: Obj | null
  backgroundImageClassNames: string[]
}) {
  return (
    backgroundImage &&
    (backgroundImage.contentType().startsWith('video/') &&
    backgroundImage.contentUrl().startsWith('https://') ? (
      <InPlaceEditingOff>
        <video
          className={backgroundImageClassNames.join(' ')}
          autoPlay
          loop
          muted
        >
          <source
            src={backgroundImage.contentUrl()}
            type={backgroundImage.contentType()}
          />
        </video>
      </InPlaceEditingOff>
    ) : (
      <InPlaceEditingOff>
        <ImageTag
          content={widget}
          attribute="backgroundImage"
          className={backgroundImageClassNames.join(' ')}
        />
      </InPlaceEditingOff>
    ))
  )
})
