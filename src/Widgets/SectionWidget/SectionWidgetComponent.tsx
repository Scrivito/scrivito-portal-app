import {
  provideComponent,
  InPlaceEditingOff,
  ImageTag,
  ContentTag,
} from 'scrivito'
import { SectionWidget } from './SectionWidgetClass'
import { isVideoObj } from './utils/isVideoObj'

provideComponent(SectionWidget, ({ widget }) => {
  const sectionClassNames: string[] = []

  const backgroundColor = widget.get('backgroundColor')
  if (backgroundColor && backgroundColor !== 'transparent') {
    sectionClassNames.push(`bg-${backgroundColor}`)
  }

  if (widget.get('showPadding')) sectionClassNames.push('py-5')

  const backgroundImage = widget.get('backgroundImage')
  const backgroundImageClassNames = ['img-background']
  if (widget.get('backgroundAnimateOnHover')) {
    backgroundImageClassNames.push('img-zoom')
  }

  let contentClassName = 'container'
  if (widget.get('containerWidth') === '95-percent') {
    contentClassName = 'container-fluid'
  }
  if (widget.get('containerWidth') === '100-percent') {
    contentClassName = ''
  }

  return (
    <section className={sectionClassNames.join(' ')}>
      {backgroundImage &&
        (isVideoObj(backgroundImage) &&
        backgroundImage.contentUrl().startsWith('https://') ? (
          <InPlaceEditingOff>
            <video className="img-background" autoPlay loop muted>
              <>
                <source
                  src={`${backgroundImage.contentUrl()}`}
                  type="video/mp4"
                />
              </>
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
        ))}
      <ContentTag
        tag="div"
        content={widget}
        className={contentClassName}
        attribute="content"
      />
    </section>
  )
})
