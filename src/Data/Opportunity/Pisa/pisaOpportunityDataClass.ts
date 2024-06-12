import { provideDataClass } from 'scrivito'
import { pisaClient } from '../../pisaClient'

export async function pisaOpportunityDataClass() {
  const opportunityClient = await pisaClient('opportunity')

  return provideDataClass('Opportunity', {
    restApi: opportunityClient,
  })
}
