import * as Scrivito from 'scrivito'
import { BannerHeadlineWidget } from './BannerHeadlineWidgetClass'

Scrivito.provideComponent(BannerHeadlineWidget, ({ widget }) => {
  const style = widget.get('style') || 'h2'
  const level = widget.get('level') || style

  const backgroundColor = widget.get('backgroundColor') || 'white'

  return (
    <Scrivito.WidgetTag tag={level} className={style}>
      <Scrivito.ContentTag
        content={widget}
        attribute="headline"
        tag="span"
        className={`bg-${backgroundColor}`}
      />
    </Scrivito.WidgetTag>
  )
})
