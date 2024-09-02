import { provideWidgetClass } from 'scrivito'

export const VerticalNavigationWidget = provideWidgetClass(
  'VerticalNavigationWidget',
  {
    attributes: {
      showGrandChildren: 'boolean',
    },
  },
)
