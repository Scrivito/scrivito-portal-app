import { provideWidgetClass } from 'scrivito'

export const DataFormHiddenFieldWidget = provideWidgetClass(
  'DataFormHiddenFieldWidget',
  {
    onlyInside: 'DataFormContainerWidget',
    attributes: {
      data: 'datalocator',
      hiddenValue: 'string',
    },
  },
)
