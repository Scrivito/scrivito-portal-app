import { provideWidgetClass } from 'scrivito'
import { paddingAttributes } from '../propertiesGroups/padding/paddingAttributes'

export const DataGroupWidget = provideWidgetClass('DataGroupWidget', {
  attributes: {
    content: 'widgetlist',
    data: 'datalocator',
    ...paddingAttributes,
  },
})
