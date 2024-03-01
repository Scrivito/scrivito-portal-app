import {
  ContentTag,
  DataScope,
  isInPlaceEditingActive,
  provideComponent,
  // @ts-expect-error TODO: remove once officially released
  useDataScope,
} from 'scrivito'
import { DataEmptyWidget } from './DataEmptyWidgetClass'
import { EditorNote } from '../../Components/EditorNote'
import { useState } from 'react'

provideComponent(DataEmptyWidget, ({ widget }) => {
  const dataScope: DataScope | undefined = useDataScope()
  const [showAnyway, setShowAnyway] = useState(false)

  if (!dataScope) {
    return <EditorNote>No data scope found!</EditorNote>
  }

  if (dataScope.isEmpty()) {
    return <ContentTag content={widget} attribute="content" />
  }

  if (!isInPlaceEditingActive()) return null

  return (
    <>
      <EditorNote>
        The data scope is currently not empty.{' '}
        {showAnyway ? (
          <button
            className="btn btn-sm btn-outline-secondary"
            onClick={() => setShowAnyway(false)}
          >
            Hide content
          </button>
        ) : (
          <button
            className="btn btn-sm btn-outline-secondary"
            onClick={() => setShowAnyway(true)}
          >
            Show content anyway
          </button>
        )}
      </EditorNote>
      {showAnyway ? <ContentTag content={widget} attribute="content" /> : null}
    </>
  )
})
