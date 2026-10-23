import { provideWidgetClass } from 'scrivito'

export const LinkContainerWidget = provideWidgetClass('LinkContainerWidget', {
  attributes: {
    design: ['design', { kind: 'container' }],
    headline: 'string',
    links: ['widgetlist', { only: 'LinkWidget' }],
  },
})
