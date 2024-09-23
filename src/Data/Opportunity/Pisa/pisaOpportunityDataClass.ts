import { provideDataClass } from 'scrivito'
import { pisaConfig } from '../../pisaClient'
import { fetchAndFilterAttributes } from '../../fetchAndFilterAttributes'

export function pisaOpportunityDataClass() {
  return provideDataClass('Opportunity', {
    restApi: pisaConfig('opportunity'),
    attributes: () => fetchAndFilterAttributes('opportunity'),
  })
}
