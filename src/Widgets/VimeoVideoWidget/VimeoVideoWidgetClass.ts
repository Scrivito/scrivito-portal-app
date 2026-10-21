import { provideWidgetClass } from 'scrivito'

export const VimeoVideoWidget = provideWidgetClass('VimeoVideoWidget', {
  attributes: {
    design: ['design', { preset: 'media' }],
    vimeoVideoId: 'string',
    aspectRatio: [
      'enum',
      { values: ['21to9', '16to9', '4to3', '1to1', '3to4', '9to16'] },
    ],
  },
})
