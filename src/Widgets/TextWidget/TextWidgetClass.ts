import { provideWidgetClass } from 'scrivito'
import { textStyleAttributes } from '../propertiesGroups/textStyle/textStyleAttributes'
import { paddingAttributes } from '../propertiesGroups/padding/paddingAttributes'

export const TextWidget = provideWidgetClass('TextWidget', {
  attributes: {
    alignment: ['enum', { values: ['left', 'center', 'right'] }],
    text: 'html',
    ...paddingAttributes,
    ...textStyleAttributes,
  },
  extractTextAttributes: ['text'],
})
