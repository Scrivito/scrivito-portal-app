import { provideEditingConfig } from 'scrivito'
import { DataFormContainerWidget } from './DataFormContainerWidgetClass'
import { DataFormInputFieldWidget } from '../DataFormInputFieldWidget/DataFormInputFieldWidgetClass'
import { DataFormSubmitButtonWidget } from '../DataFormSubmitButtonWidget/DataFormSubmitButtonWidgetClass'

provideEditingConfig(DataFormContainerWidget, {
  title: 'Data Form',
  attributes: {
    redirectAfterCreate: {
      title: 'Redirect after create',
      description: 'If no item is set, the parent of the current obj is used.',
    },
  },
  properties: ['redirectAfterCreate'],
  initialContent: {
    content: [
      new DataFormInputFieldWidget({}),
      new DataFormSubmitButtonWidget({}),
    ],
  },
})
