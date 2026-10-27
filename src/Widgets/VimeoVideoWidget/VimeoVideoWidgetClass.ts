import { provideWidgetClass } from 'scrivito'

export const VimeoVideoWidget = provideWidgetClass('VimeoVideoWidget', {
  attributes: {
    vimeoVideoId: 'string',
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
          '9to16',
          '10to16',
        ],
      },
    ],
  },
})
