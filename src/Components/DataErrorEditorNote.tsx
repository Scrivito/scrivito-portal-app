import { EditorNote } from './EditorNote'

export function DataErrorEditorNote({ error }: { error: unknown }) {
  return (
    <EditorNote>
      Error fetching data:{' '}
      {error instanceof Error ? error.message : JSON.stringify(error)}
    </EditorNote>
  )
}
