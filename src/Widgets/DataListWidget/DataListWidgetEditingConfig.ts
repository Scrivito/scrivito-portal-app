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
    showFooter: { title: 'Show footer?' },
  },
  properties: ['showFooter', 'nrOfColumns'],
  initialContent: {
    nrOfColumns: '1',
  },
})
