import { provideWidgetClass } from 'scrivito'

export const DataAttachmentsWidget = provideWidgetClass(
  'DataAttachmentsWidget',
  {
    attributes: {
      data: 'datalocator',
      design: ['design', { preset: 'container' }],
      label: 'string',
    },
  },
)
