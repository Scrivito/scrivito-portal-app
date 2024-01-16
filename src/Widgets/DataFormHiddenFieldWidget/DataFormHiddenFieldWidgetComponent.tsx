import { provideComponent } from 'scrivito'
import { DataFormHiddenFieldWidget } from './DataFormHiddenFieldWidgetClass'
import { ensureString } from '../../utils/ensureString'

provideComponent(DataFormHiddenFieldWidget, ({ widget }) => {
  const name = ensureString(widget.get('attributeName'))
  if (!name) return null

  return <input type="hidden" name={name} value={widget.get('hiddenValue')} />
})
