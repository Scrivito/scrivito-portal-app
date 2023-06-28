import * as Scrivito from 'scrivito'

export const PersonCardWidget = Scrivito.provideWidgetClass(
  'PersonCardWidget',
  {
    attributes: {
      person: ['reference', { only: ['Person'] }],
    },
  }
)
