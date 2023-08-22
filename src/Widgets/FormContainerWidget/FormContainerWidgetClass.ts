import { provideWidgetClass } from 'scrivito'

export const FormContainerWidget = provideWidgetClass('FormContainerWidget', {
  attributes: {
    content: 'widgetlist',
    formId: 'string',
    failedMessage: 'string',
    submittedMessage: 'string',
    submittingMessage: 'string',
    hiddenFields: ['widgetlist', { only: 'FormHiddenFieldWidget' }],
  },
  extractTextAttributes: ['content'],
})
