import { provideEditingConfig } from 'scrivito'
import { DataColumnListWidget } from './DataColumnListWidgetClass'
import Thumbnail from './thumbnail.svg'

provideEditingConfig(DataColumnListWidget, {
  title: 'Data Column List',
  thumbnail: Thumbnail,
  attributes: {
    columnsCount: {
      title: 'Number of columns',
      description: 'Default: 2',
    },
  },
  properties: ['columnsCount'],
  initialContent: {
    columnsCount: '2',
  },
})
