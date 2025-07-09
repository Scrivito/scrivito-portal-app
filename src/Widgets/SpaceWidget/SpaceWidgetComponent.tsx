import { provideComponent } from 'scrivito'
import { SpaceWidget } from './SpaceWidgetClass'

provideComponent(SpaceWidget, ({ widget }) => {
  const size = widget.get('size') || 5
  const unit = widget.get('unit') || 'rem'
  return <div style={{ height: `${size}${unit}` }} />
})
