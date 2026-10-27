import { provideWidgetClass } from 'scrivito'

export const DataAttachmentsWidget = provideWidgetClass(
  'DataAttachmentsWidget',
  {
    attributes: {
      data: 'datalocator',
      design: 'design',
      label: 'string',
    },
  },
)
