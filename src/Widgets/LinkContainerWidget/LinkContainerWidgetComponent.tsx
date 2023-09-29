import { connect, ContentTag, provideComponent, WidgetTag } from 'scrivito'
import { InPlaceEditingPlaceholder } from '../../Components/InPlaceEditingPlaceholder'
import { LinkContainerWidget } from './LinkContainerWidgetClass'

provideComponent(LinkContainerWidget, ({ widget }) => (
  <WidgetTag className="mb-7 mb-sm-0">
    <Headline widget={widget} />
    <ContentTag
      className="link-container-widget"
      tag="ul"
      content={widget}
      attribute="links"
    />
  </WidgetTag>
))

const Headline = connect(({ widget }) => {
  const headline = widget.get('headline')

  if (!headline) {
    return (
      <InPlaceEditingPlaceholder>
        Optional: Provide a headline in the widget properties.
      </InPlaceEditingPlaceholder>
    )
  }

  return (
    <div className="link-container-widget--headline b-bottom">
      {widget.get('headline')}
    </div>
  )
})
