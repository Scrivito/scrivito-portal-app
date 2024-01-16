import { provideEditingConfig } from 'scrivito'
import { DataFormContainerWidget } from './DataFormContainerWidgetClass'
import { DataFormInputFieldWidget } from '../DataFormInputFieldWidget/DataFormInputFieldWidgetClass'
import { DataFormSubmitButtonWidget } from '../DataFormSubmitButtonWidget/DataFormSubmitButtonWidgetClass'
import Thumbnail from './thumbnail.svg'

provideEditingConfig(DataFormContainerWidget, {
  title: 'Data Form',
  thumbnail: Thumbnail,
  attributes: {
    redirectAfterSubmit: {
      title: 'Redirect after submit',
      description: 'Leave the attribute empty for no redirection.',
    },
    submittedMessage: {
      title: 'Submitted message',
      description: 'After submitting the form, the user will see this message.',
    },
    hiddenFields: {
      title: 'Hidden fields',
    },
  },
  properties: ['redirectAfterSubmit', 'submittedMessage'],
  propertiesGroups: [
    {
      title: 'Hidden fields',
      key: 'DataFormContainerWidgetHiddenFields',
      properties: ['hiddenFields'],
    },
  ],
  initialContent: {
    content: [
      new DataFormInputFieldWidget({}),
      new DataFormSubmitButtonWidget({}),
    ],
  },
})
