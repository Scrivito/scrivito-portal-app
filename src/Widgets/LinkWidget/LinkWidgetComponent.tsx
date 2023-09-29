import { connect, Link, LinkTag, provideComponent, WidgetTag } from 'scrivito'
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
      <LinkTag to={link}>{linkTitle(link)}</LinkTag>
    </WidgetTag>
  )
})

function linkTitle(link: Link) {
  const linkTitle = link.title()
  if (linkTitle) return linkTitle

  const objTitle = link.isInternal() && link.obj()?.get('title')
  if (typeof objTitle === 'string') return objTitle

  return link.url()
}
