import { provideEditingConfig } from 'scrivito'
import { PersonCardWidget } from './PersonCardWidgetClass'
import Thumbnail from './thumbnail.svg'

provideEditingConfig(PersonCardWidget, {
  title: 'Person Card',
  attributes: {
    attributeName: {
      title: 'Attribute name',
      values: [
        { value: 'salesUserId', title: 'Sales User' },
        { value: 'serviceUserId', title: 'Service User' },
      ],
      description: "Default: 'Sales User'",
    },
  },
  properties: ['attributeName', 'headline'],
  thumbnail: Thumbnail,
  initialContent: {
    attributeName: 'salesUserId',
    headline: 'Your sales representative',
  },
})
