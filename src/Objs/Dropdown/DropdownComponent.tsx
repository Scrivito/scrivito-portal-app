import { provideComponent, isEditorLoggedIn, Obj, ContentTag } from 'scrivito'
import { Dropdown } from './DropdownObjClass'

provideComponent(Dropdown, () => {
  if (isEditorLoggedIn()) {
    return (
      <main id="main">
        <div className="container d-flex h-100">
          <div className="alert alert-warning d-flex m-auto">
            <i
              className="bi bi-exclamation-circle bi-2x"
              aria-hidden="true"
            ></i>
            <div className="my-auto mx-2">
              This obj is only a placeholder, so that a dropdown can be rendered
              in the navigation.
            </div>
          </div>
        </div>
      </main>
    )
  }

  return (
    <ContentTag
      tag="main"
      id="main"
      content={Obj.root()}
      attribute="siteNotFound"
    />
  )
})
