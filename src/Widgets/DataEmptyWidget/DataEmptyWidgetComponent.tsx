import {
  ContentTag,
  DataScope,
  isComparisonActive,
  isInPlaceEditingActive,
  provideComponent,
  // @ts-expect-error TODO: remove once officially released
  useDataScope,
} from 'scrivito'
import { DataEmptyWidget } from './DataEmptyWidgetClass'
import { EditorNote } from '../../Components/EditorNote'

provideComponent(DataEmptyWidget, ({ widget }) => {
  const dataScope: DataScope | undefined = useDataScope()

  if (!dataScope) {
    return <EditorNote>No data found. Please select a data source.</EditorNote>
  }

  if (
    dataScope.containsData() &&
    !isInPlaceEditingActive() &&
    !isComparisonActive()
  ) {
    return null
  }

  return (
    <ContentTag
      content={widget}
      attribute="content"
      className={dataScope.containsData() ? 'opacity-60' : null}
    />
  )
})
