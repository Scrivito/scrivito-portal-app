import * as Scrivito from 'scrivito'

/** Returns the first `FormContainerWidget` container it can find. `null` otherwise. */
export function getFormContainer(
  childWidget: Scrivito.Widget
): Scrivito.Widget | null {
  let candidate = childWidget.container()
  while (candidate instanceof Scrivito.Widget) {
    if (candidate.objClass() === 'FormContainerWidget') {
      return candidate
    }
    candidate = candidate.container()
  }

  return null
}
