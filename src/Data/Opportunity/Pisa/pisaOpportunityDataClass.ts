import { provideDataClass } from 'scrivito'
import { pisaConfig } from '../../pisaClient'

export function pisaOpportunityDataClass() {
  return provideDataClass('Opportunity', { restApi: pisaConfig('opportunity') })
}
