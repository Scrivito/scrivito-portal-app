import { provideWidgetClass } from 'scrivito'

export const DataFormContainerWidget = provideWidgetClass(
  'DataFormContainerWidget',
  {
    attributes: {
      content: 'widgetlist',
      design: ['design', { preset: 'container' }],
      redirectAfterSubmit: 'boolean',
      submitOnChange: 'boolean',
      submittedMessage: 'string',
      hiddenFields: ['widgetlist', { only: 'DataFormHiddenFieldWidget' }],
    },
    extractTextAttributes: ['content'],
  },
)
