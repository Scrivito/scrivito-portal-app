import * as Scrivito from 'scrivito'

export const ButtonWidget = Scrivito.provideWidgetClass('ButtonWidget', {
  attributes: {
    alignment: ['enum', { values: ['left', 'center', 'right', 'block'] }],
    buttonColor: ['enum', { values: ['btn-primary', 'btn-secondary','btn-outline-primary', 'btn-outline-secondary'] }],
    buttonSize: ['enum', { values: ['small', 'medium', 'large'] }],
    target: 'link',
  },
})
