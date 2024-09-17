import { provideComponent, useData } from 'scrivito'
import { DataFormHiddenFieldWidget } from './DataFormHiddenFieldWidgetClass'

provideComponent(DataFormHiddenFieldWidget, ({ widget }) => {
  const name = useData().attributeName()
  if (!name) return null

  return <input type="hidden" name={name} value={widget.get('hiddenValue')} />
})
