import { provideEditingConfig } from 'scrivito'
import { FormIdComponent } from './FormIdComponent'
import { getFormContainer } from './utils/getFormContainer'
import { pseudoRandom32CharHex } from '../../utils/pseudoRandom32CharHex'
import { FormContainerWidget } from './FormContainerWidgetClass'
import { ColumnContainerWidget } from '../ColumnContainerWidget/ColumnContainerWidgetClass'
import { ColumnWidget } from '../ColumnWidget/ColumnWidgetClass'
import { FormInputFieldWidget } from '../FormInputFieldWidget/FormInputFieldWidgetClass'
import { TextWidget } from '../TextWidget/TextWidgetClass'
import { FormButtonWidget } from '../FormButtonWidget/FormButtonWidgetClass'
import Thumbnail from './thumbnail.svg'

provideEditingConfig(FormContainerWidget, {
  title: 'Form',
  thumbnail: Thumbnail,
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
    content: () => [
      new ColumnContainerWidget({
        columns: [
          new ColumnWidget({
            colSize: 6,
            content: [
              new FormInputFieldWidget({
                type: 'given_name',
                label: 'First name',
                placeholder: 'Your first name',
                required: true,
              }),
            ],
          }),
          new ColumnWidget({
            colSize: 6,
            content: [
              new FormInputFieldWidget({
                type: 'family_name',
                label: 'Last name',
                placeholder: 'Your last name',
                required: true,
              }),
            ],
          }),
        ],
      }),
      new FormInputFieldWidget({
        label: 'Email',
        placeholder: 'Your email address',
        type: 'email',
        required: true,
      }),
      new FormInputFieldWidget({
        type: 'company',
        label: 'Company',
        placeholder: 'Your company',
      }),

      new FormInputFieldWidget({
        type: 'custom',
        customType: 'multi_line',
        customFieldName: 'custom_message',
        label: 'Message',
        placeholder: 'Your message',
        required: true,
      }),
      new TextWidget({
        text: '<p>By submitting, you agree to the terms and conditions of our privacy policy.</p>',
      }),
      new FormButtonWidget(),
    ],
  },
  validations: [
    (widget) => {
      if (getFormContainer(widget)) {
        return 'Needs to be outside of a form.'
      }

      if (widget.widgets().every((w) => w.objClass() !== 'FormButtonWidget')) {
        return 'A submit button is missing.'
      }
    },

    [
      'submittingMessage',
      (submittingMessage) => {
        if (!submittingMessage || typeof submittingMessage !== 'string') {
          return 'Specify the message to be displayed during form submission.'
        }
      },
    ],

    [
      'submittedMessage',
      (submittedMessage) => {
        if (!submittedMessage || typeof submittedMessage !== 'string') {
          return 'Specify the message to be displayed after successful form submission.'
        }
      },
    ],

    [
      'failedMessage',
      (failedMessage) => {
        if (!failedMessage || typeof failedMessage !== 'string') {
          return 'Specify the message to be displayed after form submission failed.'
        }
      },
    ],

    [
      'formId',
      (formId) => {
        if (!formId || typeof formId !== 'string') {
          return 'Specify the form ID.'
        }

        if (formId.match(/^[0-9a-fA-F]{32}$/) === null) {
          return 'Specify a valid form ID (32 character hex value).'
        }
      },
    ],
  ],
})
