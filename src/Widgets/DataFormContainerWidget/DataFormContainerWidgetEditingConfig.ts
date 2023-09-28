import { provideEditingConfig } from 'scrivito'
import { DataFormContainerWidget } from './DataFormContainerWidgetClass'
import { DataFormInputFieldWidget } from '../DataFormInputFieldWidget/DataFormInputFieldWidgetClass'
import { DataFormSubmitButtonWidget } from '../DataFormSubmitButtonWidget/DataFormSubmitButtonWidgetClass'
import { classNameToThumbnail } from '../../utils/classNameToThumbnail'

provideEditingConfig(DataFormContainerWidget, {
  title: 'Data Form',
  thumbnail: classNameToThumbnail('DataFormContainerWidget'),
  attributes: {
    redirectAfterSubmit: {
      title: 'Redirect after submit',
      description: 'If no item is set, the parent of the current obj is used.',
    },
    submittedMessage: {
      title: 'Submitted message',
      description: 'After submitting the form, the user will see this message.',
    },
  },
  properties: ['redirectAfterSubmit', 'submittedMessage'],
  initialContent: {
    content: [
      new DataFormInputFieldWidget({}),
      new DataFormSubmitButtonWidget({}),
    ],
  },
})
