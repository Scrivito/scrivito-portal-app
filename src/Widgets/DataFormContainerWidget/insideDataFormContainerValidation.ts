import { Widget } from 'scrivito'

export function insideDataFormContainerValidation(widget: Widget) {
  if (!getDataFormContainer(widget)) return 'Needs to be inside a data form.'
}

function getDataFormContainer(childWidget: Widget): Widget | null {
  let candidate = childWidget.container()
  while (candidate instanceof Widget) {
    if (candidate.objClass() === 'DataFormContainerWidget') return candidate

    candidate = candidate.container()
  }

  return null
}
