import * as Scrivito from 'scrivito'
import { DataListWidget } from './DataListWidgetClass'

Scrivito.provideEditingConfig(DataListWidget, {
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
