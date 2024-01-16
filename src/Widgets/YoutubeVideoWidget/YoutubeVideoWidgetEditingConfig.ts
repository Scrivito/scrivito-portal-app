import { provideEditingConfig } from 'scrivito'
import { YoutubeVideoWidget } from './YoutubeVideoWidgetClass'
import Thumbnail from './thumbnail.svg'

provideEditingConfig(YoutubeVideoWidget, {
  title: 'YouTube Video',
  thumbnail: Thumbnail,
  attributes: {
    youtubeVideoId: {
      title: 'YouTube video ID',
      description:
        'Every video at YouTube has a unique identifier that consists of a series' +
        ' of digits and letters. In the video URL, the ID usually is the value of the' +
        ' "v" parameter, e.g. Ys1w9A4DrO4 in youtube.com/watch?v=Ys1w9A4DrO4&feature=youtu.be.',
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
  properties: ['youtubeVideoId', 'aspectRatio'],
  initialContent: {
    aspectRatio: '16to9',
    youtubeVideoId: 'Ys1w9A4DrO4',
  },
  validations: [
    [
      'youtubeVideoId',

      (youtubeVideoId) => {
        if (!youtubeVideoId) {
          return {
            message: 'The Youtube video ID must be set.',
            severity: 'error',
          }
        }
      },
    ],
  ],
})
