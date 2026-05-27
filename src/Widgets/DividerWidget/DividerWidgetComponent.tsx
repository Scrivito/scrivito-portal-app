import { provideComponent } from 'scrivito'
import { DividerWidget } from './DividerWidgetClass'

provideComponent(DividerWidget, () => {
  return <div className="border-t border-neutral-200"></div>
})
