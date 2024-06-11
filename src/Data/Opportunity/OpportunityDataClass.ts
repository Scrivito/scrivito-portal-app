import { localStorageOpportunityDataClass } from './LocalStorage/localStorageOpportunityDataClass'
import { pisaOpportunityDataClass } from './Pisa/pisaOpportunityDataClass'

export const OpportunityPromise = import.meta.env.ENABLE_PISA
  ? pisaOpportunityDataClass()
  : localStorageOpportunityDataClass()
