import { provideComponent, ContentTag, WidgetTag } from 'scrivito'
import { SectionWidget } from './SectionWidgetClass'
import { ImageOrVideo, TogglePlayPauseRef } from '../../Components/ImageOrVideo'
import { useRef } from 'react'

provideComponent(SectionWidget, ({ widget }) => {
  const sectionClassNames: string[] = []
  const togglePlayPauseRef = useRef<TogglePlayPauseRef>(null)

  const backgroundColor = widget.get('backgroundColor')
  if (backgroundColor === 'primary') {
    sectionClassNames.push('bg-portal-primary', 'text-on-portal-primary')
  } else if (backgroundColor === 'secondary') {
    sectionClassNames.push('bg-portal-secondary', 'text-on-portal-secondary')
  } else if (backgroundColor === 'white') {
    sectionClassNames.push('bg-portal-white', 'text-on-portal-white')
  } else if (backgroundColor === 'light-grey') {
    sectionClassNames.push('bg-portal-light-grey', 'text-on-portal-light-grey')
  } else if (backgroundColor === 'middle-grey') {
    sectionClassNames.push(
      'bg-portal-middle-grey',
      'text-on-portal-middle-grey',
    )
  } else if (backgroundColor === 'dark-grey') {
    sectionClassNames.push('bg-portal-dark-grey', 'text-on-portal-dark-grey')
  } else if (backgroundColor === 'success') {
    sectionClassNames.push('bg-portal-success', 'text-on-portal-success')
  } else if (backgroundColor === 'info') {
    sectionClassNames.push('bg-portal-info', 'text-on-portal-info')
  } else if (backgroundColor === 'warning') {
    sectionClassNames.push('bg-portal-warning', 'text-on-portal-warning')
  } else if (backgroundColor === 'danger') {
    sectionClassNames.push('bg-portal-danger', 'text-on-portal-danger')
  }

  if (widget.get('showPadding')) sectionClassNames.push('py-12!')

  let contentClassName = 'container mx-auto px-3'
  if (widget.get('containerWidth') === '95-percent') {
    contentClassName = 'w-full mx-auto px-3'
  }
  if (widget.get('containerWidth') === '100-percent') {
    contentClassName = ''
  }

  return (
    <WidgetTag
      tag="section"
      className={sectionClassNames.join(' ')}
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
