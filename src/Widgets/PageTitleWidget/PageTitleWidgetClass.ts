import { provideWidgetClass } from 'scrivito'
import { textStyleAttributes } from '../propertiesGroups/textStyle/textStyleAttributes'
import { paddingAttributes } from '../propertiesGroups/padding/paddingAttributes'

export const PageTitleWidget = provideWidgetClass('PageTitleWidget', {
  attributes: {
    backgroundColor: [
      'enum',
      {
        values: [
          'white',
          'primary',
          'secondary',
          'light-grey',
          'middle-grey',
          'dark-grey',
          'success',
          'info',
          'warning',
          'danger',
        ],
      },
    ],
    ...paddingAttributes,
    ...textStyleAttributes,
  },
})
