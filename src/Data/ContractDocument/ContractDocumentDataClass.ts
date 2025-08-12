import { provideDataClass } from 'scrivito'
import { pisaConfig } from '../pisaClient'

export const ContractDocument = provideDataClass(
  'ContractDocument',
  async () => {
    const restApi = await pisaConfig('portal/contract-document')
    if (!restApi) {
      return (
        await import('./contractDocumentParamsFallback')
      ).contractDocumentParamsFallback()
    }

    return { restApi }
  },
)
