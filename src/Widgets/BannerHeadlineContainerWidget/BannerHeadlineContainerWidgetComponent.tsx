import * as Scrivito from 'scrivito'
import { BannerHeadlineContainerWidget } from './BannerHeadlineContainerWidgetClass'

Scrivito.provideComponent(BannerHeadlineContainerWidget, ({ widget }) => {
  return (
    <Scrivito.WidgetTag className="header-caption align-items-center d-flex h-100">
      <Scrivito.ContentTag
        content={widget}
        attribute="headlines"
        className="flex-column"
      />
    </Scrivito.WidgetTag>
  )
})
