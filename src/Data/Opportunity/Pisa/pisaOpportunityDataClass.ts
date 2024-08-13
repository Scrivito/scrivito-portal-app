import { provideDataClass } from 'scrivito'
import { pisaConfig } from '../../pisaClient'
import { DataClassAttributes } from '../../types'

export function pisaOpportunityDataClass(attributes: DataClassAttributes) {
  return provideDataClass('Opportunity', {
    restApi: pisaConfig('opportunity'),
    attributes,
  })
}
