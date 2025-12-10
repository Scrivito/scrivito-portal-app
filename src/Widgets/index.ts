import { initNeoletterFormWidgets } from 'scrivito-neoletter-form-widgets'
import { configurePisaSalesQuestionnaireWidgets } from './configurePisaSalesQuestionnaireWidgets'

import.meta.glob(['./**/*WidgetClass.ts', './**/*WidgetComponent.tsx'], {
  eager: true,
})

initNeoletterFormWidgets()

configurePisaSalesQuestionnaireWidgets()

export {}
