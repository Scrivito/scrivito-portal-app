import { provideComponent } from 'scrivito'
import { DividerWidget } from './DividerWidgetClass'

provideComponent(DividerWidget, ({ widget }) => {
  return <div className="border-top"></div>
})
