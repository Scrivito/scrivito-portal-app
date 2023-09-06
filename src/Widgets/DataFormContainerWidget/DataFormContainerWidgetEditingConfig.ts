import { provideEditingConfig } from 'scrivito'
import { DataFormContainerWidget } from './DataFormContainerWidgetClass'
import { DataFormInputFieldWidget } from '../DataFormInputFieldWidget/DataFormInputFieldWidgetClass'
import { DataFormSubmitButtonWidget } from '../DataFormSubmitButtonWidget/DataFormSubmitButtonWidgetClass'

provideEditingConfig(DataFormContainerWidget, {
  title: 'Data Form',
  initialContent: {
    content: [
      new DataFormInputFieldWidget({}),
      new DataFormSubmitButtonWidget({}),
    ],
  },
})
