import * as Scrivito from 'scrivito'
import { Download } from './DownloadObjClass'

Scrivito.provideEditingConfig(Download, {
  attributes: {
    tags: {
      title: 'Tags',
      description: 'Make it easier to find this download by adding some tags.',
    },
    title: {
      title: 'Title',
    },
  },
  properties: ['title', 'tags'],
})
