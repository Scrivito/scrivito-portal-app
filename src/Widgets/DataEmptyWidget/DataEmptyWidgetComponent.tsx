import {
  ContentTag,
  isComparisonActive,
  isInPlaceEditingActive,
  provideComponent,
  useData,
} from 'scrivito'
import { DataEmptyWidget } from './DataEmptyWidgetClass'

provideComponent(
  DataEmptyWidget,
  ({ widget }) => {
    const dataScope = useData()

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
  },
  { loading: () => null },
)
