import { initNeoletterFormWidgets } from 'scrivito-neoletter-form-widgets'
import { initPisaSalesQuestionnaireWidgets } from 'scrivito-pisasales-questionnaire-builder'
import { pisaSalesApiUrl } from '../Data/pisaClient'

import.meta.glob(['./**/*WidgetClass.ts', './**/*WidgetComponent.tsx'], {
  eager: true,
})

initNeoletterFormWidgets()

initPisaSalesQuestionnaireWidgets({ apiUrl: pisaSalesApiUrl() })

export {}
