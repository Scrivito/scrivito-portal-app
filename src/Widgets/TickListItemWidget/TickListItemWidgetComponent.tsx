import { useContext } from 'react'
import { ContentTag, designProps, provideComponent, WidgetTag } from 'scrivito'
import { TickListItemWidget } from './TickListItemWidgetClass'
import { TickListIconContext } from '../TickListWidget/TickListWidgetComponent'

provideComponent(TickListItemWidget, ({ widget }) => (
  <WidgetTag {...designProps(widget.get('design'))} tag="li">
    <i
      className={`icon bi bi-3x ${useContext(TickListIconContext)}`}
      aria-hidden="true"
    />
    <ContentTag content={widget} attribute="statement" tag="span" />
  </WidgetTag>
))
