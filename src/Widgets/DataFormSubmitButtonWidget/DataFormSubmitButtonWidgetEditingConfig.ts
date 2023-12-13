import { provideEditingConfig } from 'scrivito'
import { DataFormSubmitButtonWidget } from './DataFormSubmitButtonWidgetClass'
import Thumbnail from './thumbnail.svg'


provideEditingConfig(DataFormSubmitButtonWidget, {
  title: 'Data Form Submit Button',
  thumbnail: Thumbnail,

  attributes: {
    alignment: {
      title: 'Alignment',
      description: 'Default: Left',
      values: [
        { value: 'left', title: 'Left' },
        { value: 'center', title: 'Center' },
        { value: 'right', title: 'Right' },
        { value: 'block', title: 'Full width' },
      ],
    },

    submitTitle: {
      title: 'Title of the submit button',
    },

    hasReset: {
      title: 'Should a cancel button appear?',
    },

    resetTitle: {
      title: 'Title of the cancel button',
    },

    size: {
      title: 'Button size',
      description: 'Default: medium',
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
    resetTitle: 'cancel',
    alignment: 'left',
    size: 'medium',
  },
})
