import {
  ContentTag,
  isInPlaceEditingActive,
  provideComponent,
  useDataItem,
} from 'scrivito'
import { DataConditionWidget } from './DataConditionWidgetClass'

provideComponent(DataConditionWidget, ({ widget }) => {
  const dataItem = useDataItem()
  const attributeValue = dataItem?.get(widget.get('attributeName')) ?? ''
  const isVisible = attributeValue.toString() === widget.get('attributeValue')

  if (isVisible) return <ContentTag content={widget} attribute="content" />
  if (isInPlaceEditingActive()) {
    return (
      <ContentTag content={widget} attribute="content" className="opacity-40" />
    )
  }
  return null
})
