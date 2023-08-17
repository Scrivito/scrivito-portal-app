import { provideEditingConfig } from 'scrivito'
import { DataListWidget } from './DataListWidgetClass'

provideEditingConfig(DataListWidget, {
  title: 'Data list',
  attributes: {
    nrOfColumns: {
      title: 'Number of columns',
      description: 'Default: 1',
    },
  },
  properties: ['data', 'nrOfColumns'],
  initialContent: {
    nrOfColumns: '1',
  },
})
