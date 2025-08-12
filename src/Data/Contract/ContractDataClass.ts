import { provideDataClass } from 'scrivito'
import { pisaConfig } from '../pisaClient'

export const Contract = provideDataClass('Contract', async () => {
  const restApi = await pisaConfig('portal/contract')
  if (!restApi) {
    return (await import('./contractParamsFallback')).contractParamsFallback()
  }

  return { restApi }
})
