import { provideWidgetClass } from 'scrivito'

export const IconContainerWidget = provideWidgetClass('IconContainerWidget', {
  attributes: {
    design: ['design', { preset: 'container' }],
    iconList: ['widgetlist', { only: 'IconWidget' }],
  },
})
