import * as Scrivito from 'scrivito'

export const IconWidget = Scrivito.provideWidgetClass('IconWidget', {
  attributes: {
    icon: 'string',
    size: ['enum', { values: ['bi-1x', 'bi-2x', 'bi-3x', 'bi-4x', 'bi-5x'] }],
    alignment: ['enum', { values: ['left', 'center', 'right'] }],
    link: 'link',
  },
})
