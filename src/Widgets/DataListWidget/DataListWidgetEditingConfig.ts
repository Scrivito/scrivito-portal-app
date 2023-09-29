import { provideEditingConfig } from 'scrivito'
import { DataListWidget } from './DataListWidgetClass'
import { classNameToThumbnail } from '../../utils/classNameToThumbnail'

provideEditingConfig(DataListWidget, {
  title: 'Data List',
  thumbnail: classNameToThumbnail('DataListWidget'),
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
