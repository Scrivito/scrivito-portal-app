import { provideWidgetClass } from 'scrivito'
import { textStyleAttributes } from '../propertiesGroups/textStyle/textStyleAttributes'
import { paddingAttributes } from '../propertiesGroups/padding/paddingAttributes'

export const LinkContainerWidget = provideWidgetClass('LinkContainerWidget', {
  attributes: {
    headline: 'string',
    links: ['widgetlist', { only: 'LinkWidget' }],
    ...paddingAttributes,
    ...textStyleAttributes,
  },
})
