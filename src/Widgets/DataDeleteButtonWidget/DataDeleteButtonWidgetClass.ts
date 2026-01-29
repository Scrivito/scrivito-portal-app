import { provideWidgetClass } from 'scrivito'
import { paddingAttributes } from '../propertiesGroups/padding/paddingAttributes'

export const DataDeleteButtonWidget = provideWidgetClass(
  'DataDeleteButtonWidget',
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
      cancelTitle: 'string',
      confirmTitle: 'string',
      deletedMessage: 'string',
      redirectAfterDelete: 'reference',
      requireConfirmation: 'boolean',
      title: 'string',
      ...paddingAttributes,
    },
  },
)
