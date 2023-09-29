import { provideWidgetClass } from 'scrivito'

export const IconContainerWidget = provideWidgetClass('IconContainerWidget', {
  attributes: {
    iconList: ['widgetlist', { only: 'IconWidget' }],
  },
})
