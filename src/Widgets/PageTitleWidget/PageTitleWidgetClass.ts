import { provideWidgetClass } from 'scrivito'
import { textStyleAttributes } from '../propertiesGroups/textStyle/textStyleAttributes'

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
    ...textStyleAttributes,
  },
})
