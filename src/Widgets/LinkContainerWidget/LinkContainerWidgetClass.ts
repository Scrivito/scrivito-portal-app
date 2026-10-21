import { provideWidgetClass } from 'scrivito'

export const LinkContainerWidget = provideWidgetClass('LinkContainerWidget', {
  attributes: {
    design: ['design', { preset: 'container' }],
    headline: 'string',
    links: ['widgetlist', { only: 'LinkWidget' }],
  },
})
