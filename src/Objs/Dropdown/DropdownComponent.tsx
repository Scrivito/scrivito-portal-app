import * as Scrivito from 'scrivito'
import { Dropdown } from './DropdownObjClass'
import { useEffect } from 'react'

Scrivito.provideComponent(Dropdown, ({ page }) => {
  useEffect(() => {
    navigateAway()

    async function navigateAway() {
      if (Scrivito.isEditorLoggedIn()) return

      const destination =
        (await Scrivito.load(() => page.orderedChildren()[0])) ||
        (await Scrivito.load(() => page.parent())) ||
        (await Scrivito.load(() => Scrivito.Obj.root()))

      if (!destination) return

      const url = await Scrivito.load(() => Scrivito.urlFor(destination))
      window.location.replace(url)
    }
  }, [])

  if (Scrivito.isEditorLoggedIn()) {
    return (
      <div>
        This obj is only a placeholder, so that a dropdown can be rendered in
        the navigation
      </div>
    )
  }

  return null
})
