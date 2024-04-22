import { provideWidgetClass } from 'scrivito'

export const DataFormContainerWidget = provideWidgetClass(
  'DataFormContainerWidget',
  {
    attributes: {
      content: 'widgetlist',
      failedMessage: 'string',
      redirectAfterSubmit: 'boolean',
      submitOnChange: 'boolean',
      submittedMessage: 'string',
      hiddenFields: ['widgetlist', { only: 'DataFormHiddenFieldWidget' }],
    },
    extractTextAttributes: ['content'],
  },
)
