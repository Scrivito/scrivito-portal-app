import { provideEditingConfig } from 'scrivito'
import { DataSearchWidget } from './DataSearchWidgetClass'
import thumbnail from './thumbnail.svg'

provideEditingConfig(DataSearchWidget, {
  title: 'Data Search',
  thumbnail,
  attributes: {
    buttonColor: {
      title: 'Button color',
      description: 'Default: Primary color',
      values: [
        { value: 'btn-primary', title: 'Primary color' },
        { value: 'btn-secondary', title: 'Secondary color' },
      ],
    },
    placeholder: { title: 'Placeholder text' },
  },
  properties: ['buttonColor', 'placeholder'],
  initialContent: {
    buttonColor: 'btn-primary',
    buttonSize: 'medium',
  },
})
