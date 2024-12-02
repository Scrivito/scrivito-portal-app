import { provideWidgetClass } from 'scrivito'

export const VideoWidget = provideWidgetClass('VideoWidget', {
  attributes: {
    source: ['reference', { only: ['Video'] }],
    poster: ['reference', { only: ['Image'] }],
    noDownload: 'boolean',
    aspectRatio: [
      'enum',
      { values: ['21to9', '16to9', '4to3', '1to1', '3to4', '9to16'] },
    ],
  },
})
