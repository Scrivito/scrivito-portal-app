import { provideComponent, ContentTag, WidgetTag } from 'scrivito'
import { SectionWidget } from './SectionWidgetClass'
import { ImageOrVideo, TogglePlayPauseRef } from '../../Components/ImageOrVideo'
import { useRef } from 'react'

provideComponent(SectionWidget, ({ widget }) => {
  const sectionClassNames: string[] = []
  const togglePlayPauseRef = useRef<TogglePlayPauseRef>(null)

  const backgroundColor = widget.get('backgroundColor')
  const backgroundColorCustom = widget.get('backgroundColorCustom')

  let sectionStyle: React.CSSProperties | undefined

  if (backgroundColor === 'custom' && backgroundColorCustom) {
    sectionClassNames.push('bg-custom')
    sectionStyle = {
      '--bg-color': backgroundColorCustom,
    } as React.CSSProperties
  } else if (backgroundColor && backgroundColor !== 'transparent') {
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
    <WidgetTag
      tag="section"
      className={sectionClassNames.join(' ')}
      style={sectionStyle}
      onClick={(e) => togglePlayPauseRef.current?.togglePlayPause(e)}
    >
      <ImageOrVideo
        widget={widget}
        attribute="backgroundImage"
        className={
          widget.get('backgroundAnimateOnHover') ? 'img-zoom' : undefined
        }
        togglePlayPauseRef={togglePlayPauseRef}
      />
      <ContentTag
        tag="div"
        content={widget}
        className={contentClassName}
        attribute="content"
      />
    </WidgetTag>
  )
})
