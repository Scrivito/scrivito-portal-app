import * as Scrivito from 'scrivito'
import { SectionWidget } from './SectionWidgetClass'

Scrivito.provideEditingConfig(SectionWidget, {
  title: 'Section',
  attributes: {
    backgroundColor: {
      title: 'Background color',
      description:
        'Does not apply if a background image is set. Default: White',
      values: [
        { value: 'white', title: 'White' },
        { value: 'primary', title: 'Primary color' },
        { value: 'secondary', title: 'Secondary color' },
        { value: 'light-grey', title: 'Light grey' },
        { value: 'middle-grey', title: 'Grey' },
        { value: 'dark-grey', title: 'Dark grey' },
        { value: 'transparent', title: 'Transparent' },
      ],
    },
  },
  properties: ['backgroundColor'],
  initialContent: {
    backgroundColor: 'white',
  },
})
