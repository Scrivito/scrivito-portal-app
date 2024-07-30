import {
  ContentTag,
  isComparisonActive,
  isInPlaceEditingActive,
  provideComponent,
  useData,
} from 'scrivito'
import { DataEmptyWidget } from './DataEmptyWidgetClass'
import { DataErrorEditorNote } from '../../Components/DataErrorEditorNote'

provideComponent(
  DataEmptyWidget,
  ({ widget }) => {
    const dataScope = useData()

    let containsData
    try {
      containsData = dataScope.containsData()
    } catch (error) {
      return <DataErrorEditorNote error={error} />
    }

    if (containsData && !isInPlaceEditingActive() && !isComparisonActive()) {
      return null
    }

    return (
      <ContentTag
        content={widget}
        attribute="content"
        className={containsData ? 'opacity-60' : null}
      />
    )
  },
  { loading: () => null },
)
