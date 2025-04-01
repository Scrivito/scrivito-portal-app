import { initNeoletterFormWidgets } from 'scrivito-neoletter-form-widgets'
import { initPisaQuestionnaireWidgets } from 'scrivito-pisasales-questionnaire-builder'

import.meta.glob(['./**/*WidgetClass.ts', './**/*WidgetComponent.tsx'], {
  eager: true,
})

initNeoletterFormWidgets()

// Replace "https://your-pisa-api-url" with the actual PisaSales REST API URL
initPisaQuestionnaireWidgets({ pisaUrl: "https://your-pisa-api-url" })

export { }
