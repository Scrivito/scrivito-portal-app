import { provideWidgetClass } from 'scrivito'

export const LinkWidget = provideWidgetClass('LinkWidget', {
  onlyInside: 'LinkContainerWidget',
  attributes: {
    design: ['design', { groups: ['text', 'decoration'] }],
    link: 'link',
  },
})
