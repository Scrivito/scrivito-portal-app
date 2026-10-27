import { provideWidgetClass } from 'scrivito'

export const IconContainerWidget = provideWidgetClass('IconContainerWidget', {
  attributes: {
    design: 'design',
    iconList: ['widgetlist', { only: 'IconWidget' }],
  },
})
