import { initNeoletterFormWidgets } from 'scrivito-neoletter-form-widgets'
import { initPisaSalesQuestionnaireWidgets } from 'scrivito-pisasales-questionnaire-builder'
import { questionnaireBackendConnection } from '../Data/pisaClient'

import.meta.glob(['./**/*WidgetClass.ts', './**/*WidgetComponent.tsx'], {
  eager: true,
})

initNeoletterFormWidgets()

initPisaSalesQuestionnaireWidgets({
  connection: questionnaireBackendConnection(),
})

export {}
