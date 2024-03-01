import {
  ContentTag,
  DataScope,
  isInPlaceEditingActive,
  provideComponent,
  // @ts-expect-error TODO: remove once officially released
  useDataScope,
} from 'scrivito'
import { DataEmptyWidget } from './DataEmptyWidgetClass'
import { EditorNoteOrNull } from '../../Components/EditorNoteOrNull'
import { useState } from 'react'

provideComponent(DataEmptyWidget, ({ widget }) => {
  const dataScope: DataScope | undefined = useDataScope()
  const [showAnyway, setShowAnyway] = useState(false)

  if (!dataScope) {
    return <EditorNoteOrNull>No data scope found!</EditorNoteOrNull>
  }

  if (dataScope.isEmpty()) {
    return <ContentTag content={widget} attribute="content" />
  }

  if (!isInPlaceEditingActive()) return null

  return (
    <>
      <EditorNoteOrNull>
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
      </EditorNoteOrNull>
      {showAnyway ? <ContentTag content={widget} attribute="content" /> : null}
    </>
  )
})
