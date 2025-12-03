import { createRestApiClient, getInstanceId } from 'scrivito'

export async function getJrPlatformPisaSalesApiUrl(): Promise<string | null> {
  const instanceConfig = (await createRestApiClient(
    'https://api.justrelate.com',
  ).get(`/ams/instances/${getInstanceId()}`)) as {
    pisa_sales_api_url?: string | null
  }

  return instanceConfig.pisa_sales_api_url || null
}
