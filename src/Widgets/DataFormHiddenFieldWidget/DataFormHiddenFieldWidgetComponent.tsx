import { provideComponent } from 'scrivito'
import { DataFormHiddenFieldWidget } from './DataFormHiddenFieldWidgetClass'

provideComponent(DataFormHiddenFieldWidget, ({ widget }) => {
  const name = widget.get('attributeName')
  if (typeof widget.get('attributeName') !== 'string') return null
  if (!name) return null

  return <input type="hidden" name={name} value={widget.get('hiddenValue')} />
})
