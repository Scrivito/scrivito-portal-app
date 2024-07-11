import { provideDataClass } from 'scrivito'
import { pisaConfig } from '../../pisaClient'

export async function pisaOpportunityDataClass() {
  const opportunityConfig = await pisaConfig('opportunity')

  return provideDataClass('Opportunity', {
    restApi: opportunityConfig,
    attributes: {},
  })
}
