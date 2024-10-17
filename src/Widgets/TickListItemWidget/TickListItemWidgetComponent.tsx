import { ContentTag, provideComponent, WidgetTag } from 'scrivito'
import { TickListItemWidget } from './TickListItemWidgetClass'

provideComponent(TickListItemWidget, ({ widget }) => (
  <WidgetTag tag="li">
    <i
      className={`icon bi bi-3x ${widget.get('icon') || 'bi-check'}`}
      aria-hidden="true"
    />
    <ContentTag content={widget} attribute="statement" tag="span" />
  </WidgetTag>
))
