import { provideComponent, isEditorLoggedIn, load, Obj, urlFor } from 'scrivito'
import { Dropdown } from './DropdownObjClass'
import { useEffect } from 'react'

provideComponent(Dropdown, ({ page }) => {
  useEffect(() => {
    navigateAway()

    async function navigateAway() {
      if (isEditorLoggedIn()) return

      const destination =
        (await load(() => page.orderedChildren()[0])) ||
        (await load(() => page.parent())) ||
        (await load(() => Obj.root()))

      if (!destination) return

      const url = await load(() => urlFor(destination))
      window.location.replace(url)
    }
  }, [page])

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

  return null
})
