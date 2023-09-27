import { provideWidgetClass } from 'scrivito'

export const YoutubeVideoWidget = provideWidgetClass('YoutubeVideoWidget', {
  attributes: {
    youtubeVideoId: 'string',
    aspectRatio: [
      'enum',
      { values: ['21to9', '16to9', '4to3', '1to1', '3to4', '9to16'] },
    ],
  },
})
