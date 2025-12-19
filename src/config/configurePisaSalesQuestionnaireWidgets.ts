import {
  BackendConnectionData,
  initPisaSalesQuestionnaireWidgets,
} from 'scrivito-pisasales-questionnaire-builder'
import { pisaSalesApiUrl } from '../Data/pisaClient'
import { jwtPisaSalesApiAuth } from '../Data/jwtPisaSalesApiConfig'

export function configurePisaSalesQuestionnaireWidgets() {
  initPisaSalesQuestionnaireWidgets({ connection: connection() })
}

async function connection(): Promise<BackendConnectionData> {
  if (import.meta.env.FORCE_LOCAL_STORAGE) return { apiUrl: null, token: null }

  const defaultUrl = await pisaSalesApiUrl()
  if (defaultUrl) return { apiUrl: defaultUrl, token: null }

  const jwtConfig = await jwtPisaSalesApiAuth()
  if (jwtConfig) return jwtConfig

  return { apiUrl: null, token: null }
}
