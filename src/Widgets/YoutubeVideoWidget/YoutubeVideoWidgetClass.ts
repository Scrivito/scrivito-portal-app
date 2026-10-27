import { provideWidgetClass } from 'scrivito'

export const YoutubeVideoWidget = provideWidgetClass('YoutubeVideoWidget', {
  attributes: {
    // The design goes on the wrapper, not on the iframe inside it, so this is a container
    // with a surface rather than a replaced element.
    design: 'design',
    youtubeVideoId: 'string',
    aspectRatio: [
      'enum',
      { values: ['21to9', '16to9', '4to3', '1to1', '3to4', '9to16'] },
    ],
  },
})
