import { provideWidgetClass } from 'scrivito'

export const IconContainerWidget = provideWidgetClass('IconContainerWidget', {
  attributes: {
    design: ['design', { kind: 'container' }],
    iconList: ['widgetlist', { only: 'IconWidget' }],
  },
})
