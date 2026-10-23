import { provideWidgetClass } from 'scrivito'

export const CardWidget = provideWidgetClass('CardWidget', {
  attributes: {
    backgroundAnimateOnHover: 'boolean',
    backgroundImage: ['reference', { only: ['Image', 'Video'] }],
    cardBody: 'widgetlist',
    cardExtended: 'boolean',
    cardFooter: 'widgetlist',
    // Background color, padding and margin used to be attributes of their own.
    design: [
      'design',
      {
        kind: 'container',
        extraAttributes: ['backgroundImage', 'backgroundAnimateOnHover'],
      },
    ],
    image: ['reference', { only: ['Image'] }],
    linkTo: 'link',
    showFooter: 'boolean',
  },
  extractTextAttributes: ['cardBody', 'cardFooter'],
})
