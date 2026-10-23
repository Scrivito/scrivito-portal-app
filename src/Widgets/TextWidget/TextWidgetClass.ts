import { provideWidgetClass } from 'scrivito'

export const TextWidget = provideWidgetClass('TextWidget', {
  attributes: {
    design: ['design', { kind: 'text' }],
    text: 'html',
  },
  extractTextAttributes: ['text'],
})
