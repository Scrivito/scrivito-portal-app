import { provideWidgetClass } from 'scrivito'

export const TextWidget = provideWidgetClass('TextWidget', {
  attributes: {
    design: 'design',
    text: 'html',
  },
  extractTextAttributes: ['text'],
})
