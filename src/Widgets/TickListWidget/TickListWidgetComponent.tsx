import { createContext } from 'react'
import { ContentTag, designProps, provideComponent } from 'scrivito'
import { TickListWidget } from './TickListWidgetClass'
import './TickListWidget.scss'

export const TickListIconContext = createContext('')

provideComponent(TickListWidget, ({ widget }) => (
  <TickListIconContext value={widget.get('icon') || 'bi-check'}>
    <ContentTag
      {...designProps(widget.get('design'))}
      tag="ul"
      className="tick-list-widget list-unstyled"
      content={widget}
      attribute="items"
    />
  </TickListIconContext>
))
