import { provideEditingConfig } from 'scrivito'
import { Download } from './DownloadObjClass'

provideEditingConfig(Download, {
  attributes: {
    excludeFromSearch: {
      title: 'Exclude from search results?',
      description:
        'If checked, this download will not be included in search results.',
    },
    tags: {
      title: 'Tags',
      description: 'Make it easier to find this download by adding some tags.',
    },
    title: {
      title: 'Title',
    },
  },
  properties: ['title', 'tags', 'excludeFromSearch'],
})
