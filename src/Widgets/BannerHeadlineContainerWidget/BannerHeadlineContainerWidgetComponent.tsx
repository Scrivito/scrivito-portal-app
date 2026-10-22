import { ContentTag, provideComponent, WidgetTag } from 'scrivito'
import { BannerHeadlineContainerWidget } from './BannerHeadlineContainerWidgetClass'

provideComponent(BannerHeadlineContainerWidget, ({ widget }) => {
  return (
    <WidgetTag
      design
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
