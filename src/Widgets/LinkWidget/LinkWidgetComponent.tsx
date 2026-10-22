import {
  designProps,
  Link,
  LinkTag,
  provideComponent,
  WidgetTag,
} from 'scrivito'
import { InPlaceEditingPlaceholder } from '../../Components/InPlaceEditingPlaceholder'
import { LinkWidget } from './LinkWidgetClass'
import { ensureString } from '../../utils/ensureString'

provideComponent(LinkWidget, ({ widget }) => {
  const link = widget.get('link')
  const design = designProps(widget)

  if (!link) {
    return (
      <WidgetTag {...design} tag="li">
        <InPlaceEditingPlaceholder>
          Provide a link in the widget properties.
        </InPlaceEditingPlaceholder>
      </WidgetTag>
    )
  }

  return (
    <WidgetTag {...design} tag="li">
      <LinkTag to={link}>{linkTitle(link)}</LinkTag>
    </WidgetTag>
  )
})

function linkTitle(link: Link) {
  const linkTitle = link.title()
  if (linkTitle) return linkTitle

  const objTitle = ensureString(link.obj()?.get('title'))
  if (objTitle) return objTitle

  return link.url()
}
