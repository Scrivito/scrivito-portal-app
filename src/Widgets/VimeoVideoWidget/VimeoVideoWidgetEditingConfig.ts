import { provideEditingConfig } from 'scrivito'
import Thumbnail from './thumbnail.svg'

provideEditingConfig('VimeoVideoWidget', {
  title: 'Vimeo Video',
  thumbnail: Thumbnail,
  attributes: {
    vimeoVideoId: {
      title: 'Vimeo video ID',
      description:
        'Every video at Vimeo has a unique identifier that consists of a series' +
        ' of digits. In the video URL, the ID usually is the value at the end,' +
        ' e.g. 15069551 in https://vimeo.com/15069551.',
    },
    aspectRatio: {
      title: 'Aspect ratio',
      description: 'Default: HD TV (16:9)',
      values: [
        { value: '21to9', title: 'CinemaScope (21:9)' },
        { value: '16to9', title: 'HD TV (16:9)' },
        { value: '4to3', title: 'Traditional TV (4:3)' },
        { value: '1to1', title: 'Square (1:1)' },
        { value: '3to4', title: 'Portrait traditional TV (3:4)' },
        { value: '9to16', title: 'Portrait HD TV (9:16)' },
      ],
    },
  },
  properties: ['vimeoVideoId', 'aspectRatio'],
  initialContent: {
    aspectRatio: '16to9',
    vimeoVideoId: '15069551',
  },
  validations: [
    [
      'vimeoVideoId',

      (vimeoVideoId) => {
        if (!vimeoVideoId) {
          return {
            message: 'The Vimeo video ID must be set.',
            severity: 'error',
          }
        }
      },
    ],
  ],
})
