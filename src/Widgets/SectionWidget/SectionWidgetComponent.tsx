import { provideComponent, ContentTag, WidgetTag } from 'scrivito'
import { SectionWidget } from './SectionWidgetClass'
import { ImageOrVideo, TogglePlayPauseRef } from '../../Components/ImageOrVideo'
import { applyPadding } from '../propertiesGroups/padding/applyPadding'
import { useRef } from 'react'

provideComponent(SectionWidget, ({ widget }) => {
  const sectionClassNames: string[] = []
  const togglePlayPauseRef = useRef<TogglePlayPauseRef>(null)

  const backgroundColor = widget.get('backgroundColor')
  if (backgroundColor && backgroundColor !== 'transparent') {
    sectionClassNames.push(`bg-${backgroundColor}`)
  }

  let contentClassName = 'container'
  if (widget.get('containerWidth') === '95-percent') {
    contentClassName = 'container-fluid'
  }
  if (widget.get('containerWidth') === '100-percent') {
    contentClassName = ''
  }

  const showPaddingFallback = widget.get('showPadding') ? '48px' : undefined

  return (
    <WidgetTag
      tag="section"
      className={sectionClassNames.join(' ')}
      style={applyPadding(widget, {
        paddingTop: showPaddingFallback,
        paddingBottom: showPaddingFallback,
      })}
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
