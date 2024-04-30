import { loadEditingConfigs } from 'scrivito-neoletter-form-widgets/editing'

import.meta.glob(['./**/*EditingConfig.ts', './**/*EditingConfig.tsx'], {
  eager: true,
})
loadEditingConfigs()

export {}
