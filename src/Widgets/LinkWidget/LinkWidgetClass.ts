import { provideWidgetClass } from 'scrivito'

export const LinkWidget = provideWidgetClass('LinkWidget', {
  onlyInside: 'LinkContainerWidget',
  attributes: {
    design: 'design',
    link: 'link',
  },
})
