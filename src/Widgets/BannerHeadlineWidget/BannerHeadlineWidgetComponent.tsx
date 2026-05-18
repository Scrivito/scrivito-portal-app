import { ContentTag, provideComponent, WidgetTag } from 'scrivito'
import { BannerHeadlineWidget } from './BannerHeadlineWidgetClass'

provideComponent(BannerHeadlineWidget, ({ widget }) => {
  const style = widget.get('style') || 'h2'

  const backgroundColor = widget.get('backgroundColor') || 'white'

  return (
    <WidgetTag tag={tag(widget.get('level'), style)} className={style}>
      <ContentTag
        content={widget}
        attribute="headline"
        tag="span"
        className={backgroundClassName(backgroundColor)}
      />
    </WidgetTag>
  )
})

function tag(level: string | null, style: string): string {
  if (level) return level

  if (style === 'display-1') return 'h1'
  if (style === 'display-2') return 'h2'
  if (style === 'display-3') return 'h3'
  if (style === 'display-4') return 'h4'
  if (style === 'display-5') return 'h5'
  if (style === 'display-6') return 'h6'

  return style
}

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
