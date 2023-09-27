import { connect, LinkTag, provideComponent, WidgetTag } from 'scrivito'
import { InPlaceEditingPlaceholder } from '../../Components/InPlaceEditingPlaceholder'
import { LinkWidget } from './LinkWidgetClass'

provideComponent(LinkWidget, ({ widget }) => {
  const link = widget.get('link')

  if (!link) {
    return (
      <WidgetTag tag="li">
        <InPlaceEditingPlaceholder>
          Provide a link in the widget properties.
        </InPlaceEditingPlaceholder>
      </WidgetTag>
    )
  }

  return (
    <WidgetTag tag="li">
      <LinkTag to={link}>
        <LinkTitle link={link} />
      </LinkTag>
    </WidgetTag>
  )
})

const LinkTitle = connect(({ link }) => {
  if (link.title()) return link.title()
  if (link.isInternal()) return link.obj().get('title')

  return link.url()
})
