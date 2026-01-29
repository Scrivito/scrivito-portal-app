import { createContext } from 'react'
import { ContentTag, provideComponent } from 'scrivito'
import { applyTextStyle } from '../propertiesGroups/textStyle/applyTextStyle'
import { applyPadding } from '../propertiesGroups/padding/applyPadding'
import { TickListWidget } from './TickListWidgetClass'
import './TickListWidget.scss'

export const TickListIconContext = createContext('')

provideComponent(TickListWidget, ({ widget }) => (
  <TickListIconContext value={widget.get('icon') || 'bi-check'}>
    <ContentTag
      tag="ul"
      className="tick-list-widget list-unstyled"
      content={widget}
      attribute="items"
      style={{ ...applyPadding(widget), ...applyTextStyle(widget) }}
    />
  </TickListIconContext>
))
