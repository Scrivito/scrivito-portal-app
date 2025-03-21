import { provideWidgetClass } from 'scrivito'

export const LanguageSwitchWidget = provideWidgetClass('LanguageSwitchWidget', {
  attributes: {
    alignment: ['enum', { values: ['left', 'center', 'right'] }],
  },
})
