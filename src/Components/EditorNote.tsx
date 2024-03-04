import { isInPlaceEditingActive } from 'scrivito'

/** Shows `children` nicely formatted in edit mode, `null` overwise */
export function EditorNote({ children }: { children: React.ReactNode }) {
  if (!isInPlaceEditingActive()) return null

  return (
    <div className="alert alert-warning d-flex m-auto">
      <i className="bi bi-exclamation-circle bi-2x" aria-hidden="true"></i>
      <div className="my-auto mx-2">
        <b>Editor note:</b> {children}
      </div>
    </div>
  )
}
