import { provideDataClass } from 'scrivito'
import { pisaClient } from '../../pisaClient'

export function pisaOpportunityDataClass() {
  const opportunityClient = pisaClient('opportunity')

  return provideDataClass('Opportunity', {
    restApi: opportunityClient,
  })
}
