import { Widget } from 'scrivito'

/** Returns the first `FormContainerWidget` container it can find. `null` otherwise. */
export function getFormContainer(childWidget: Widget): Widget | null {
  let candidate = childWidget.container()
  while (candidate instanceof Widget) {
    if (candidate.objClass() === 'FormContainerWidget') {
      return candidate
    }
    candidate = candidate.container()
  }

  return null
}
