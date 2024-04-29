import { provideWidgetClass } from 'scrivito'

export const DataLoadMoreButtonWidget = provideWidgetClass(
  'DataLoadMoreButtonWidget',
  {
    attributes: {
      alignment: ['enum', { values: ['left', 'center', 'right', 'block'] }],
      buttonColor: [
        'enum',
        {
          values: [
            'btn-primary',
            'btn-secondary',
            'btn-danger',
            'btn-outline-primary',
            'btn-outline-secondary',
            'btn-outline-danger',
          ],
        },
      ],
      buttonSize: ['enum', { values: ['small', 'medium', 'large'] }],
      title: 'string',
    },
  },
)
