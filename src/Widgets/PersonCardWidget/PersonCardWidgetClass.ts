import { provideWidgetClass } from 'scrivito'

export const PersonCardWidget = provideWidgetClass('PersonCardWidget', {
  attributes: {
    person: ['reference', { only: ['Person'] }],
  },
})
