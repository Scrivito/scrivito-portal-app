import { provideComponent, ContentTag, WidgetTag } from 'scrivito'
import { SectionWidget } from './SectionWidgetClass'
import { ImageOrVideo, TogglePlayPauseRef } from '../../Components/ImageOrVideo'
import { useRef } from 'react'

provideComponent(SectionWidget, ({ widget }) => {
  const sectionClassNames: string[] = []
  const togglePlayPauseRef = useRef<TogglePlayPauseRef>(null)

  const backgroundColor = widget.get('backgroundColor') || 'transparent'
  sectionClassNames.push(backgroundClassName(backgroundColor))

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

function backgroundClassName(backgroundColor: string): string {
  switch (backgroundColor) {
    case 'primary':
      return 'bg-portal-primary text-on-portal-primary'
    case 'secondary':
      return 'bg-portal-secondary text-on-portal-secondary'
    case 'white':
      return 'bg-portal-white text-on-portal-white'
    case 'light-grey':
      return 'bg-portal-light-grey text-on-portal-light-grey'
    case 'middle-grey':
      return 'bg-portal-middle-grey text-on-portal-middle-grey'
    case 'dark-grey':
      return 'bg-portal-dark-grey text-on-portal-dark-grey'
    case 'success':
      return 'bg-portal-success text-on-portal-success'
    case 'info':
      return 'bg-portal-info text-on-portal-info'
    case 'warning':
      return 'bg-portal-warning text-on-portal-warning'
    case 'danger':
      return 'bg-portal-danger text-on-portal-danger'
    case 'transparent':
      return ''
    default:
      throw new Error(`Unknown backgroundColor: ${backgroundColor}`)
  }
}
