import {
  provideComponent,
  ContentTag,
  connect,
  ImageTag,
  InPlaceEditingOff,
  Obj,
  Widget,
} from 'scrivito'
import { SectionWidget } from './SectionWidgetClass'

provideComponent(SectionWidget, ({ widget }) => {
  const sectionClassNames: string[] = []

  const backgroundColor = widget.get('backgroundColor')
  if (backgroundColor && backgroundColor !== 'transparent') {
    sectionClassNames.push(`bg-${backgroundColor}`)
  }

  if (widget.get('showPadding')) sectionClassNames.push('py-5')

  let contentClassName = 'container'
  if (widget.get('containerWidth') === '95-percent') {
    contentClassName = 'container-fluid'
  }
  if (widget.get('containerWidth') === '100-percent') {
    contentClassName = ''
  }

  return (
    <section className={sectionClassNames.join(' ')}>
      <ImageOrVideo widget={widget} />
      <ContentTag
        tag="div"
        content={widget}
        className={contentClassName}
        attribute="content"
      />
    </section>
  )
})

const ImageOrVideo = connect(function ImageOrVideo({
  widget,
}: {
  widget: InstanceType<typeof SectionWidget>
}) {
  const backgroundImage = widget.get('backgroundImage')
  const backgroundImageClassNames = ['img-background']
  if (widget.get('backgroundAnimateOnHover')) {
    backgroundImageClassNames.push('img-zoom')
  }

  return (
    backgroundImage &&
    (backgroundImage.contentType().startsWith('video/') &&
    backgroundImage.contentUrl().startsWith('https://') ? (
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
