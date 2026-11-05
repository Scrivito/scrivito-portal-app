import { useEffect } from 'react'
import {
  ContentTag,
  isEditorLoggedIn,
  Obj,
  provideComponent,
  urlFor,
} from 'scrivito'
import { Dropdown } from './DropdownObjClass'

provideComponent(Dropdown, ({ page }) => {
  const isEditor = isEditorLoggedIn()
  const target = firstChild(page)
  const targetUrl = target && urlFor(target)

  useEffect(() => {
    if (!isEditor && targetUrl) window.location.replace(targetUrl)
  }, [isEditor, targetUrl])

  if (isEditor) {
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
              in the navigation. Visitors are redirected to its first child.
            </div>
          </div>
        </div>
      </main>
    )
  }

  // Without a child there is nothing to redirect to.
  if (targetUrl) return null

  return (
    <ContentTag
      tag="main"
      id="main"
      content={Obj.root()}
      attribute="siteNotFound"
    />
  )
})

// Same children as the navigation shows.
function firstChild(dropdown: Obj): Obj | undefined {
  return dropdown
    .orderedChildren()
    .find((child) => child.get('hideInNavigation') !== true)
}
