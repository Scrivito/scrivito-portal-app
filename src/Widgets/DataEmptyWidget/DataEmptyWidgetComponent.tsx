import {
  ContentTag,
  isComparisonActive,
  isInPlaceEditingActive,
  provideComponent,
  useData,
} from 'scrivito'
import { DataEmptyWidget } from './DataEmptyWidgetClass'
import { EditorNote } from '../../Components/EditorNote'

provideComponent(
  DataEmptyWidget,
  ({ widget }) => {
    const dataScope = useData()

    let containsData
    try {
      containsData = dataScope.containsData()
    } catch (error) {
      return (
        <EditorNote>
          Error fetching data:{' '}
          {error instanceof Error ? error.message : JSON.stringify(error)}
        </EditorNote>
      )
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
