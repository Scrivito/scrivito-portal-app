import { getInstanceId, createApiClient } from 'scrivito'

export function neoletterClient() {
  return createApiClient(
    `https://api.justrelate.com/neoletter/instances/${getInstanceId()}`,
  )
}
