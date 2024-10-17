import { ContentTag, provideComponent } from 'scrivito'
import { TickListWidget } from './TickListWidgetClass'
import './TickListWidget.scss'

provideComponent(TickListWidget, ({ widget }) => (
  <ContentTag
    tag="ul"
    className="tick-list-widget"
    content={widget}
    attribute="items"
  />
))
