import { provideWidgetClass } from 'scrivito'
import { textStyleAttributes } from '../propertiesGroups/textStyle/textStyleAttributes'
import { paddingAttributes } from '../propertiesGroups/padding/paddingAttributes'

export const LinkWidget = provideWidgetClass('LinkWidget', {
  onlyInside: 'LinkContainerWidget',
  attributes: {
    link: 'link',
    ...paddingAttributes,
    ...textStyleAttributes,
  },
})
