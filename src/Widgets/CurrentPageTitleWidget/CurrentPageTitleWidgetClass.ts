import { provideWidgetClass } from 'scrivito'

export const CurrentPageTitleWidget = provideWidgetClass(
  'CurrentPageTitleWidget',
  {
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
    },
  },
)
