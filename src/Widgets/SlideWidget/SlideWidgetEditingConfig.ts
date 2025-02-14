import { provideEditingConfig } from 'scrivito'
import { SlideWidget } from './SlideWidgetClass'
import thumbnail from './thumbnail.svg'

provideEditingConfig(SlideWidget, {
  title: 'Slide',
  thumbnail,
  attributes: {
    backgroundColor: {
      title: 'Background color',
      description: 'Default: Transparent',
      values: [
        { value: 'transparent', title: 'Transparent' },
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
    background: {
      title: 'Background image or video',
    },
  },
  properties: ['backgroundColor', 'background'],
  initialContent: {
    backgroundColor: 'transparent',
  },
})
