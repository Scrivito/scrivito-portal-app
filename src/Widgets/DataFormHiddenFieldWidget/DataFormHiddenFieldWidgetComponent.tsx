import { provideComponent } from 'scrivito'
import { getAttributeName } from '../DataFormContainerWidget/utils/getAttributeName'
import { DataFormHiddenFieldWidget } from './DataFormHiddenFieldWidgetClass'

provideComponent(DataFormHiddenFieldWidget, ({ widget }) => {
  const name = getAttributeName(widget)
  if (!name) return null

  return <input type="hidden" name={name} value={widget.get('hiddenValue')} />
})
