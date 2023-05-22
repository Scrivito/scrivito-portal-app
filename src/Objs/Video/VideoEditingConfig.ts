import * as Scrivito from 'scrivito'
import { Video } from './VideoObjClass'

Scrivito.provideEditingConfig(Video, {
  title: 'Video',
  attributes: {
    tags: {
      title: 'Tags',
      description: 'Make it easier to find this video by adding some tags.',
    },
  },
  properties: ['tags'],
})
