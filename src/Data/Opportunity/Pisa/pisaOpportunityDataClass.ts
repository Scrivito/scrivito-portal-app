import { provideDataClass } from 'scrivito'
import { pisaConfig } from '../../pisaClient'
import { filterSchema } from '../../filterSchema'

export function pisaOpportunityDataClass() {
  return provideDataClass('Opportunity', {
    restApi: pisaConfig('opportunity'),
    attributes: () => filterSchema('opportunity'),
  })
}
