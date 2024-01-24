import { provideWidgetClass } from 'scrivito'

export const DataAttachmentsWidget = provideWidgetClass(
  'DataAttachmentsWidget',
  {
    attributes: {
      attributeName: 'string',
    },
  },
)
