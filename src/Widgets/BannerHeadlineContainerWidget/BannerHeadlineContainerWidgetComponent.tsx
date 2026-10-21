import { ContentTag, designProps, provideComponent, WidgetTag } from 'scrivito'
import { BannerHeadlineContainerWidget } from './BannerHeadlineContainerWidgetClass'

provideComponent(BannerHeadlineContainerWidget, ({ widget }) => {
  return (
    <WidgetTag
      {...designProps(widget.get('design'))}
      className="header-caption align-items-center d-flex h-100"
    >
      <ContentTag
        content={widget}
        attribute="headlines"
        className="flex-column"
      />
    </WidgetTag>
  )
})
