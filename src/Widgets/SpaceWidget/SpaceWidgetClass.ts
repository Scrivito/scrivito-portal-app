import { provideWidgetClass } from 'scrivito'

export const SpaceWidget = provideWidgetClass('SpaceWidget', {
  attributes: {
    size: 'float',
    unit: ['enum', { values: ['rem', 'vh'] }],
  },
})
