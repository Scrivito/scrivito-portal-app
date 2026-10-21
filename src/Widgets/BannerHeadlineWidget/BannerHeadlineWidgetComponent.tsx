import { ContentTag, designProps, provideComponent, WidgetTag } from 'scrivito'
import { BannerHeadlineWidget } from './BannerHeadlineWidgetClass'

provideComponent(BannerHeadlineWidget, ({ widget }) => {
  const style = widget.get('style') || 'h2'

  return (
    <WidgetTag tag={tag(widget.get('level'), style)} className={style}>
      <ContentTag
        {...designProps(widget.get('design'))}
        content={widget}
        attribute="headline"
        tag="span"
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
