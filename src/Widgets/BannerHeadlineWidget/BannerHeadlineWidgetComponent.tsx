import { ContentTag, provideComponent, WidgetTag } from 'scrivito'
import { BannerHeadlineWidget } from './BannerHeadlineWidgetClass'

provideComponent(BannerHeadlineWidget, ({ widget }) => {
  const style = widget.get('style') || 'h2'
  const level = widget.get('level') || style

  const backgroundColor = widget.get('backgroundColor') || 'white'

  return (
    <WidgetTag tag={level} className={style}>
      <ContentTag
        content={widget}
        attribute="headline"
        tag="span"
        className={`bg-${backgroundColor}`}
      />
    </WidgetTag>
  )
})
