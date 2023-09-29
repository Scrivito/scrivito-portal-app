import { provideEditingConfig } from 'scrivito'
import { Video } from './VideoObjClass'
import { classNameToThumbnail } from '../../utils/classNameToThumbnail'

provideEditingConfig(Video, {
  title: 'Video',
  thumbnail: classNameToThumbnail('Video'),
  attributes: {
    tags: {
      title: 'Tags',
      description: 'Make it easier to find this video by adding some tags.',
    },
  },
  properties: ['tags'],
})
