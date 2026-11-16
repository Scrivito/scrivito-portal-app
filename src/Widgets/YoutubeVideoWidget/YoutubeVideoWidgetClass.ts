import { provideWidgetClass } from 'scrivito'

export const YoutubeVideoWidget = provideWidgetClass('YoutubeVideoWidget', {
  attributes: {
    youtubeVideoId: 'string',
    aspectRatio: [
      'enum',
      {
        values: [
          '21to9',
          '16to9',
          '16to10',
          '4to3',
          '1to1',
          '3to4',
          '10to16',
          '9to16',
        ],
      },
    ],
  },
})
