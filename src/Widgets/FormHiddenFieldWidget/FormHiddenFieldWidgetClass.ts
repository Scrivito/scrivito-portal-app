import { provideWidgetClass } from 'scrivito'

export const FormHiddenFieldWidget = provideWidgetClass(
  'FormHiddenFieldWidget',
  {
    onlyInside: 'FormContainerWidget',
    attributes: {
      customFieldName: 'string',
      hiddenValue: 'string',
      type: [
        'enum',
        {
          values: ['custom', 'subscription'],
        },
      ],
    },
  },
)
