import { provideWidgetClass } from 'scrivito'

export const VerticalNavigationWidget = provideWidgetClass(
  'VerticalNavigationWidget',
  {
    attributes: {
      navigationDepth: ['enum', { values: ['0', '1', '2'] }],
    },
  },
)
