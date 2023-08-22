import { provideEditingConfig, Widget } from 'scrivito'
import { FormIdComponent } from './FormIdComponent'
import { getFormContainer } from './utils/getFormContainer'
import { pseudoRandom32CharHex } from './utils/pseudoRandom32CharHex'
import { FormContainerWidget } from './FormContainerWidgetClass'

provideEditingConfig(FormContainerWidget, {
  title: 'Form',
  attributes: {
    formId: {
      title: 'Form ID',
      description: 'This ID identifies the form in Neoletter.',
    },
    submittingMessage: {
      title: 'Message shown while the form is being submitted',
    },
    submittedMessage: {
      title: 'Message shown after the form was successfully submitted',
    },
    failedMessage: {
      title: 'Message shown if the form submission failed',
    },
    hiddenFields: {
      title: 'Hidden fields',
    },
  },
  properties: ['submittingMessage', 'submittedMessage', 'failedMessage'],
  propertiesGroups: [
    {
      title: 'Hidden fields',
      key: 'FormContainerWidgetHiddenFields',
      properties: ['hiddenFields'],
    },
    {
      title: 'Form submissions',
      key: 'FormContainerWidgetFormSubmissions',
      properties: ['formId'],
      component: FormIdComponent as unknown as null,
    },
  ],
  initialContent: {
    formId: () => pseudoRandom32CharHex(),
    submittingMessage: 'Submitting...',
    submittedMessage:
      'Your message has been successfully sent. Thank you for your request. We will get back to you as soon as possible.',
    failedMessage:
      'We are sorry, your request could not be completed. Please try again later.',
  },
  validations: [
    (widget: Widget) => {
      if (getFormContainer(widget)) {
        return 'Needs to be outside of a form.'
      }

      if (widget.widgets().every((w) => w.objClass() !== 'FormButtonWidget')) {
        return 'A submit button is missing.'
      }
    },

    [
      'submittingMessage',
      (submittingMessage: string) => {
        if (!submittingMessage) {
          return 'Specify the message to be displayed during form submission.'
        }
      },
    ],

    [
      'submittedMessage',
      (submittedMessage: string) => {
        if (!submittedMessage) {
          return 'Specify the message to be displayed after successful form submission.'
        }
      },
    ],

    [
      'failedMessage',
      (failedMessage: string) => {
        if (!failedMessage) {
          return 'Specify the message to be displayed after form submission failed.'
        }
      },
    ],

    [
      'formId',
      (formId: string) => {
        if (!formId) {
          return 'Specify the form ID.'
        }

        if (formId.match(/^[0-9a-fA-F]{32}$/) === null) {
          return 'Specify a valid form ID (32 character hex value).'
        }
      },
    ],
  ],
})
