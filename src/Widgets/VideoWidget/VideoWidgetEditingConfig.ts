import { provideEditingConfig } from 'scrivito'
import Thumbnail from './thumbnail.svg'
import { VideoWidget } from './VideoWidgetObjClass'

provideEditingConfig(VideoWidget, {
  title: 'Video',
  thumbnail: Thumbnail,
  attributes: {
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
    source: {
      title: 'Video',
      description:
        'Click to select or upload video. This should be of type video/mp4.',
    },
    poster: {
      title: 'Poster image (optional)',
      description:
        'This poster image is shown, until the video is loaded.' +
        ' Without an poster image, the browser may show the first frame of the video.',
    },
    noDownload: {
      title: 'Hide download button?',
      description: 'Only supported by some browsers.',
    },
  },
  properties: ['source', 'poster', 'aspectRatio', 'noDownload'],
  initialContent: {
    aspectRatio: '16to9',
  },
  validations: [
    [
      'source',
      (source) => {
        if (!source) {
          return { message: 'The video should be set.', severity: 'warning' }
        }
      },
    ],
  ],
})
