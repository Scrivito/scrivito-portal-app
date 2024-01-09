import { provideComponent } from 'scrivito'
import { DividerWidget } from './DividerWidgetClass'

provideComponent(DividerWidget, () => {
  return <div className="border-top"></div>
})
