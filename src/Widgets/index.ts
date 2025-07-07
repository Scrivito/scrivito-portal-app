import { initNeoletterFormWidgets } from 'scrivito-neoletter-form-widgets'
import { initPisaQuestionnaireWidgets } from 'scrivito-pisasales-questionnaire-builder'
import { pisaSalesApiUrl } from '../Data/pisaClient'

import.meta.glob(['./**/*WidgetClass.ts', './**/*WidgetComponent.tsx'], {
  eager: true,
})

initNeoletterFormWidgets()

pisaSalesApiUrl().then(pisaUrl => initPisaQuestionnaireWidgets({ pisaUrl: pisaUrl || '' }))

export {}
