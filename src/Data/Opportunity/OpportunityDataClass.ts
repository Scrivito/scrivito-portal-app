import { localStorageOpportunityDataClass } from './LocalStorage/localStorageOpportunityDataClass'
import { pisaOpportunityDataClass } from './Pisa/pisaOpportunityDataClass'

export const Opportunity = import.meta.env.ENABLE_PISA
  ? pisaOpportunityDataClass()
  : localStorageOpportunityDataClass()
