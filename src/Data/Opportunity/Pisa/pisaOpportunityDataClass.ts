import { provideDataClass } from 'scrivito'
import { pisaConfig } from '../../pisaClient'

export async function pisaOpportunityDataClass() {
  return provideDataClass('Opportunity', {
    restApi: pisaConfig('opportunity'),
    attributes: {},
  })
}
