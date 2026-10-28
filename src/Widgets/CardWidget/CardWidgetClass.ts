import { provideWidgetClass } from 'scrivito'

export const CardWidget = provideWidgetClass('CardWidget', {
  attributes: {
    backgroundAnimateOnHover: 'boolean',
    backgroundImage: ['reference', { only: ['Image', 'Video'] }],
    cardBody: 'widgetlist',
    cardExtended: 'boolean',
    cardFooter: 'widgetlist',
    // Background color, padding and margin used to be attributes of their own.
    design: 'design',
    // The top image is a replaced element of its own: its height and fit cannot come from
    // the card's design, which styles the card around it.
    imageDesign: 'design',
    image: ['reference', { only: ['Image'] }],
    linkTo: 'link',
    showFooter: 'boolean',
  },
  extractTextAttributes: ['cardBody', 'cardFooter'],
})
