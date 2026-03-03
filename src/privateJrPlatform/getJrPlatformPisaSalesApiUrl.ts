import { getInstanceId, load, provideDataClass } from 'scrivito'

const InstanceConfigDataClass = provideDataClass({
  restApi: 'https://api.justrelate.com/ams/instances',
  attributes: {
    pisa_sales_api_url: 'unknown',
  },
})

export async function getJrPlatformPisaSalesApiUrl(): Promise<string | null> {
  const instanceConfig = await load(() =>
    InstanceConfigDataClass.get(getInstanceId()),
  )
  if (!instanceConfig) return null

  return instanceConfig.get('pisa_sales_api_url') as string | null
}
