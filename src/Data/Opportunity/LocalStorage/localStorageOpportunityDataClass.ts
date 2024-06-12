import { provideLocalStorageDataClass } from '../../../utils/provideLocalStorageDataClass'

export async function localStorageOpportunityDataClass() {
  return provideLocalStorageDataClass('Opportunity')
}
