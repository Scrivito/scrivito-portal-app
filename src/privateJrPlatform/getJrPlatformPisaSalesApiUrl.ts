import { createRestApiClient, getInstanceId } from 'scrivito'

interface InstanceConfig {
  pisa_sales_api_url?: string | null
}

let cachedInstanceConfigPromise: Promise<InstanceConfig> | undefined

async function getInstanceConfig(): Promise<InstanceConfig> {
  return (cachedInstanceConfigPromise ||= createRestApiClient(
    'https://api.justrelate.com',
  ).get(`/ams/instances/${getInstanceId()}`) as Promise<InstanceConfig>)
}

export async function getJrPlatformPisaSalesApiUrl(): Promise<string | null> {
  return (await getInstanceConfig()).pisa_sales_api_url || null
}
