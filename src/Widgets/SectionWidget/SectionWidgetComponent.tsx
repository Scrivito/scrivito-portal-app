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
  const background = widget.get('backgroundImage')
  if (!background) return null

  const classNames = ['img-background']
  if (widget.get('backgroundAnimateOnHover')) classNames.push('img-zoom')

  return (
    // Check is a working around for issue #4767
    // TODO: remove work around
    background.contentType().startsWith('video/') &&
      background.contentUrl().startsWith('https://') ? (
      <video className={classNames.join(' ')} autoPlay loop muted>
        <source src={background.contentUrl()} type={background.contentType()} />
      </video>
    ) : (
      <InPlaceEditingOff>
        <ImageTag
          content={widget}
          attribute="backgroundImage"
          className={classNames.join(' ')}
        />
      </InPlaceEditingOff>
    )
  )
})
