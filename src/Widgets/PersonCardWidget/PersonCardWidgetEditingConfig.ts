import { provideEditingConfig } from 'scrivito'
import { PersonCardWidget } from './PersonCardWidgetClass'
import Thumbnail from './thumbnail.svg'

provideEditingConfig(PersonCardWidget, {
  title: 'Person Card',
  thumbnail: Thumbnail,
  properties: ['person'],
})
