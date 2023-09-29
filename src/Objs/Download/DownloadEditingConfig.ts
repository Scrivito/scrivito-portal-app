import { provideEditingConfig } from 'scrivito'
import { Download } from './DownloadObjClass'
import { classNameToThumbnail } from '../../utils/classNameToThumbnail'

provideEditingConfig(Download, {
  thumbnail: classNameToThumbnail('Download'),
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
