import { DataClassAttributes } from '../types'
import { localStorageOpportunityDataClass } from './LocalStorage/localStorageOpportunityDataClass'
import { pisaOpportunityDataClass } from './Pisa/pisaOpportunityDataClass'

const attributes: DataClassAttributes = {
  description: 'string',
  keyword: 'string',
}

export const Opportunity = import.meta.env.ENABLE_PISA
  ? pisaOpportunityDataClass(attributes)
  : localStorageOpportunityDataClass(attributes)
