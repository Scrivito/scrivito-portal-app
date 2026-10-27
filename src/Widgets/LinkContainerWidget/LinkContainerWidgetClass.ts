import { provideWidgetClass } from 'scrivito'

export const LinkContainerWidget = provideWidgetClass('LinkContainerWidget', {
  attributes: {
    design: 'design',
    headline: 'string',
    links: ['widgetlist', { only: 'LinkWidget' }],
  },
})
