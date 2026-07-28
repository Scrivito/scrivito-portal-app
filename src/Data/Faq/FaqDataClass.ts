import { provideDataClass } from 'scrivito'
import { pisaConfig } from '../pisaClient'

export const Faq = provideDataClass('Faq', async () => {
  const restApi = await pisaConfig('portal/faq')
  if (!restApi) {
    return (await import('./faqParamsFallback')).faqParamsFallback()
  }

  return { restApi }
})
