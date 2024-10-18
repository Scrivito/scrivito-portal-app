import { createContext } from 'react'
import { ContentTag, provideComponent } from 'scrivito'
import { TickListWidget } from './TickListWidgetClass'
import './TickListWidget.scss'

export const TickListIconContext = createContext('')

provideComponent(TickListWidget, ({ widget }) => (
  <TickListIconContext.Provider value={widget.get('icon') || 'bi-check'}>
    <ContentTag
      tag="ul"
      className="tick-list-widget list-unstyled"
      content={widget}
      attribute="items"
    />
  </TickListIconContext.Provider>
))
