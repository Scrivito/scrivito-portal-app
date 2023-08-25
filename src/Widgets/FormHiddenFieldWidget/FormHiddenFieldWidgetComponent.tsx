import { provideComponent } from 'scrivito'
import { getFieldName } from '../FormContainerWidget/utils/getFieldName'
import { FormHiddenFieldWidget } from './FormHiddenFieldWidgetClass'

provideComponent(FormHiddenFieldWidget, ({ widget }) => {
  const name = getFieldName(widget)
  if (!name) return null

  return <input type="hidden" name={name} value={widget.get('hiddenValue')} />
})
