import { Widget } from 'scrivito'

/** Returns the first `DataFormContainerWidget` container it can find. `null` otherwise. */
export function getDataFormContainer(childWidget: Widget): Widget | null {
  let candidate = childWidget.container()
  while (candidate instanceof Widget) {
    if (candidate.objClass() === 'DataFormContainerWidget') {
      return candidate
    }
    candidate = candidate.container()
  }

  return null
}
