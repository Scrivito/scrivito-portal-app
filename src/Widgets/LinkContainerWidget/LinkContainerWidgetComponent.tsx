import { ContentTag, provideComponent, WidgetTag } from 'scrivito'
import { applyTextStyle } from '../propertiesGroups/textStyle/applyTextStyle'
import { LinkContainerWidget } from './LinkContainerWidgetClass'

provideComponent(LinkContainerWidget, ({ widget }) => (
  <WidgetTag className="mb-7 mb-sm-0">
    <ContentTag
      tag="h5"
      className="mb-3"
      content={widget}
      attribute="headline"
      style={applyTextStyle(widget)}
    />
    <ContentTag
      className="list-unstyled list-py-1 mb-0"
      tag="ul"
      content={widget}
      attribute="links"
    />
  </WidgetTag>
))
