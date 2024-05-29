import { getInstanceId, createRestApiClient } from 'scrivito'

export function neoletterClient() {
  return createRestApiClient(
    `https://api.justrelate.com/neoletter/instances/${getInstanceId()}`,
  )
}
