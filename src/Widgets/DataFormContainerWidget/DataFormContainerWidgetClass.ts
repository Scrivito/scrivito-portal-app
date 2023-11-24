import { provideWidgetClass } from 'scrivito'

export const DataFormContainerWidget = provideWidgetClass(
  'DataFormContainerWidget',
  {
    attributes: {
      content: 'widgetlist',
      redirectAfterSubmit: 'reference',
      submittedMessage: 'string',
      hiddenFields: ['widgetlist', { only: 'DataFormHiddenFieldWidget' }],
    },
    extractTextAttributes: ['content'],
  },
)
