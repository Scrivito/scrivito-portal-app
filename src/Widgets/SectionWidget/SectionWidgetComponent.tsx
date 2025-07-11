import {
  provideComponent,
  ContentTag,
  connect,
  ImageTag,
  InPlaceEditingOff,
  WidgetTag,
} from 'scrivito'
import { SectionWidget, SectionWidgetInstance } from './SectionWidgetClass'

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
    <WidgetTag tag="section" className={sectionClassNames.join(' ')}>
      <ImageOrVideo widget={widget} />
      <ContentTag
        attribute="content"
        className={contentClassName}
        content={widget}
        tag="div"
      />
    </WidgetTag>
  )
})

const ImageOrVideo = connect(function ImageOrVideo({
  widget,
}: {
  widget: SectionWidgetInstance
}) {
  const background = widget.get('backgroundImage')
  if (!background) return null

  const classNames = ['img-background']
  if (widget.get('backgroundAnimateOnHover')) classNames.push('img-zoom')

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
        alt=""
        attribute="backgroundImage"
        className={classNames.join(' ')}
        content={widget}
      />
    </InPlaceEditingOff>
  )
})
