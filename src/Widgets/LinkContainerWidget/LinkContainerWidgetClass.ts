import { provideWidgetClass } from 'scrivito'
import { textStyleAttributes } from '../propertiesGroups/textStyle/textStyleAttributes'

export const LinkContainerWidget = provideWidgetClass('LinkContainerWidget', {
  attributes: {
    headline: 'string',
    links: ['widgetlist', { only: 'LinkWidget' }],
    ...textStyleAttributes,
  },
})
