import { provideWidgetClass } from 'scrivito'

export const DataFormUploadWidget = provideWidgetClass('DataFormUploadWidget', {
  attributes: {
    data: 'datalocator',
    design: 'design',
    helpText: 'html',
    label: 'string',
    multiple: 'boolean',
    required: 'boolean',
  },
})
