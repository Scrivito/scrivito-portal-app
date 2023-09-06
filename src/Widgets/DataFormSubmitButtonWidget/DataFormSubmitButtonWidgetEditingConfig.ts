import { provideEditingConfig } from 'scrivito'
import { DataFormSubmitButtonWidget } from './DataFormSubmitButtonWidgetClass'

provideEditingConfig(DataFormSubmitButtonWidget, {
  title: 'Data Form Submit Button',

  attributes: {
    submitTitle: {
      title: 'Title of the submit button',
    },

    hasReset: {
      title: 'Should a reset button appear?',
    },

    resetTitle: {
      title: 'Title of the reset button',
    },

    size: {
      title: 'Button size',
    },
  },

  properties(widget) {
    const properties = ['submitTitle', 'alignment', 'size', 'hasReset']
    if (widget.get('hasReset')) properties.push('resetTitle')

    return properties
  },

  initialContent: {
    submitTitle: 'submit',
    hasReset: true,
    resetTitle: 'reset',
    alignment: 'center',
    size: 'small',
  },
})
