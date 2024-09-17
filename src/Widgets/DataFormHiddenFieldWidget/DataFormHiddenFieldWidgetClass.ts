import { provideWidgetClass } from 'scrivito'

export const DataFormHiddenFieldWidget = provideWidgetClass(
  'DataFormHiddenFieldWidget',
  {
    onlyInside: 'DataFormContainerWidget',
    attributes: {
      attributeName: 'string',
      data: 'datalocator',
      hiddenValue: 'string',
    },
  },
)
