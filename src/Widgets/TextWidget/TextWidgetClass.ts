import { provideWidgetClass } from 'scrivito'

export const TextWidget = provideWidgetClass('TextWidget', {
  attributes: {
    alignment: ['enum', { values: ['left', 'center', 'right'] }],
    alignmentTablet: ['enum', { values: ['left', 'center', 'right'] }],
    alignmentMobile: ['enum', { values: ['left', 'center', 'right'] }],
    text: 'html',
  },
  extractTextAttributes: ['text'],
})
