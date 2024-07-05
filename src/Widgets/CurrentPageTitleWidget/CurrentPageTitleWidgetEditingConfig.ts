import { provideEditingConfig } from 'scrivito'
import { CurrentPageTitleWidget } from './CurrentPageTitleWidgetClass'

provideEditingConfig(CurrentPageTitleWidget, {
  title: 'Current Page Title',
  attributes: {
    backgroundColor: {
      title: 'Background color',
      description: 'Default: Primary color',
      values: [
        { value: 'white', title: 'White' },
        { value: 'primary', title: 'Primary color' },
        { value: 'secondary', title: 'Secondary color' },
        { value: 'light-grey', title: 'Light grey' },
        { value: 'middle-grey', title: 'Grey' },
        { value: 'dark-grey', title: 'Dark grey' },
        { value: 'success', title: 'Success' },
        { value: 'info', title: 'Info' },
        { value: 'warning', title: 'Warning' },
        { value: 'danger', title: 'Danger' },
      ],
    },
  },
  properties: ['backgroundColor'],
  initialContent: {
    backgroundColor: 'primary',
  },
})
