import { loadEditingConfigs } from 'scrivito-neoletter-form-widgets/editing'
import { loadQuestionnaireEditingConfigs } from 'scrivito-pisasales-questionnaire-builder/editing'

import.meta.glob(['./**/*EditingConfig.ts', './**/*EditingConfig.tsx'], {
  eager: true,
})
loadEditingConfigs()
loadQuestionnaireEditingConfigs()
export {}
