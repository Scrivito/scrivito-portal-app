import { provideComponent } from 'scrivito'
import { DataFormHiddenFieldWidget } from './DataFormHiddenFieldWidgetClass'

provideComponent(DataFormHiddenFieldWidget, ({ widget }) => {
  const name =
    typeof widget.get('attributeName') === 'string'
      ? widget.get('attributeName')
      : ''
  if (!name) return null

  return <input type="hidden" name={name} value={widget.get('hiddenValue')} />
})
