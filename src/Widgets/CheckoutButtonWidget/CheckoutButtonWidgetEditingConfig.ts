import { provideEditingConfig } from 'scrivito'
import { CheckoutButtonWidget } from './CheckoutButtonWidgetClass'
import Thumbnail from './thumbnail.svg'

provideEditingConfig(CheckoutButtonWidget, {
  title: 'Checkout Button',
  attributes: {
    buttonText: { title: 'Button text' },
    successMessage: { title: 'Success Message' },
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
    buttonColor: {
      title: 'Background color',
      description: 'Default: Primary color',
      values: [
        { value: 'btn-primary', title: 'Primary color' },
        { value: 'btn-secondary', title: 'Secondary color' },
        { value: 'btn-outline-primary', title: 'Primary outline color' },
        { value: 'btn-outline-secondary', title: 'Secondary outline color' },
      ],
    },
    buttonSize: {
      title: 'Button size',
      description: 'Default: medium',
    },
  },
  thumbnail: Thumbnail,
  properties: [
    'buttonText',
    'successMessage',
    'alignment',
    'buttonColor',
    'buttonSize',
  ],
  initialContent: {
    alignment: 'center',
    buttonColor: 'btn-primary',
    buttonSize: 'medium',
    buttonText: 'Request quote',
    successMessage:
      "Quote sent! Thank you for your interest. We'll get back to you soon.",
  },
})
