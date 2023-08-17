import { provideComponent, WidgetTag, ContentTag } from 'scrivito'
import { BannerHeadlineContainerWidget } from './BannerHeadlineContainerWidgetClass'

provideComponent(BannerHeadlineContainerWidget, ({ widget }) => {
  return (
    <WidgetTag className="header-caption align-items-center d-flex h-100">
      <ContentTag
        content={widget}
        attribute="headlines"
        className="flex-column"
      />
    </WidgetTag>
  )
})
