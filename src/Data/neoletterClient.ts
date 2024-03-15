import { getInstanceId, unstable_createApiClient } from 'scrivito'

export function neoletterClient() {
  return unstable_createApiClient(
    `https://api.justrelate.com/neoletter/instances/${getInstanceId()}`,
  )
}
