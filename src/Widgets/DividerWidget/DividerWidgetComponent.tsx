import { provideComponent } from 'scrivito'
import { DividerWidget } from './DividerWidgetClass'

provideComponent(DividerWidget, () => {
  return <div className="border-t border-[#dee2e6]"></div>
})
