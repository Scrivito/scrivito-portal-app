import { Fragment } from 'react'
import { connect, ContentTag, provideComponent } from 'scrivito'
import { InPlaceEditingPlaceholder } from '../../Components/InPlaceEditingPlaceholder'
import { LinkContainerWidget } from './LinkContainerWidgetClass'

provideComponent(LinkContainerWidget, ({ widget }) => (
  <Fragment>
    <Headline widget={widget} />
    <ContentTag
      className="link-container-widget"
      tag="ul"
      content={widget}
      attribute="links"
    />
  </Fragment>
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
