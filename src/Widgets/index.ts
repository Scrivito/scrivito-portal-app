import { initNeoletterFormWidgets } from 'scrivito-neoletter-form-widgets'
import { initPisaQuestionnaireWidgets } from 'scrivito-pisasales-questionnaire-builder'
import { pisaUrl } from '../Data/pisaClient'

import.meta.glob(['./**/*WidgetClass.ts', './**/*WidgetComponent.tsx'], {
  eager: true,
})

initNeoletterFormWidgets()

pisaUrl().then(pisaUrl => initPisaQuestionnaireWidgets({ pisaUrl: pisaUrl || '' }))

export {}
