import { provideWidgetClass } from 'scrivito'

export const VideoWidget = provideWidgetClass('VideoWidget', {
  attributes: {
    source: ['reference', { only: ['Video'] }],
    poster: ['reference', { only: ['Image'] }],
  },
})
