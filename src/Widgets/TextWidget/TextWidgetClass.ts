import { provideWidgetClass } from 'scrivito'

export const TextWidget = provideWidgetClass('TextWidget', {
  attributes: {
    design: ['design', { preset: 'text' }],
    text: 'html',
  },
  extractTextAttributes: ['text'],
})
