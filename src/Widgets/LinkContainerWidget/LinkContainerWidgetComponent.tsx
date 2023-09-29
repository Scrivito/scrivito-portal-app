import { connect, ContentTag, provideComponent, WidgetTag } from 'scrivito'
import { InPlaceEditingPlaceholder } from '../../Components/InPlaceEditingPlaceholder'
import { LinkContainerWidget } from './LinkContainerWidgetClass'

provideComponent(LinkContainerWidget, ({ widget }) => (
  <WidgetTag className="mb-7 mb-sm-0">
    <ContentTag
      tag="h5"
      className="mb-3"
      content={widget}
      attribute="headline"
    />
    <ContentTag
      className="link-container-widget"
      tag="ul"
      content={widget}
      attribute="links"
    />
  </WidgetTag>
))
