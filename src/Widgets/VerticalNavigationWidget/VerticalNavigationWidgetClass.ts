import { provideWidgetClass } from 'scrivito'

export const VerticalNavigationWidget = provideWidgetClass(
  'VerticalNavigationWidget',
  {
    attributes: {
      design: 'design',
      navigationDepth: ['enum', { values: ['0', '1', '2'] }],
      showParentLink: 'boolean',
    },
  },
)
