import { provideWidgetClass } from 'scrivito'
import { paddingAttributes } from '../propertiesGroups/padding/paddingAttributes'

export const GroupWidget = provideWidgetClass('GroupWidget', {
  attributes: {
    content: 'widgetlist',
    ...paddingAttributes,
  },
  extractTextAttributes: ['content'],
})
