import { provideWidgetClass } from 'scrivito'

export const PersonCardWidget = provideWidgetClass('PersonCardWidget', {
  attributes: {
    headline: 'string',
    attributeName: ['enum', { values: ['salesUserId', 'serviceUserId'] }],
  },
})
