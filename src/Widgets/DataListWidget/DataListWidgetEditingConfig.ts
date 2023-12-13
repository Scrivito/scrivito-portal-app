import { provideEditingConfig } from 'scrivito'
import { DataListWidget } from './DataListWidgetClass'
import Thumbnail from './thumbnail.svg'


provideEditingConfig(DataListWidget, {
  title: 'Data List',
  thumbnail: Thumbnail,
  attributes: {
    nrOfColumns: {
      title: 'Number of columns',
      description: 'Default: 1',
    },
  },
  properties: ['nrOfColumns'],
  initialContent: {
    nrOfColumns: '1',
  },
})
