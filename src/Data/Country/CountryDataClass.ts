import { provideDataClass } from 'scrivito'
import { pisaConfig } from '../pisaClient'

export const Country = provideDataClass('Country', async () => {
  const restApi = await pisaConfig('portal/country')
  if (!restApi) {
    return (await import('./countryParamsFallback')).countryParamsFallback()
  }

  return { restApi }
})
