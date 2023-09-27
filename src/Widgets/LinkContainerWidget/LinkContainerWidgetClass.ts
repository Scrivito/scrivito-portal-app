import { provideWidgetClass } from 'scrivito'

export const LinkContainerWidget = provideWidgetClass('LinkContainerWidget', {
  attributes: {
    headline: 'string',
    links: ['widgetlist', { only: 'LinkWidget' }],
  },
})
