import { provideEditingConfig } from 'scrivito'
import { DataPersonCardWidget } from './DataPersonCardWidgetClass'
import Thumbnail from './thumbnail.svg'

provideEditingConfig(DataPersonCardWidget, {
  title: 'Data Person Card',
  thumbnail: Thumbnail,
  properties: ['headline'],
  initialContent: {
    headline: 'Your sales representative',
  },
})
