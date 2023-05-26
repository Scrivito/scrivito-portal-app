import * as Scrivito from 'scrivito'
import { SpaceWidget } from './SpaceWidgetClass'

Scrivito.provideComponent(SpaceWidget, ({ widget }) => {
  const size = widget.get('size') || 5
  return <div style={{ height: `${size}rem` }} />
})
