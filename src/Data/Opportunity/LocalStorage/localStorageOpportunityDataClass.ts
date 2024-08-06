import { provideLocalStorageDataClass } from '../../../utils/provideLocalStorageDataClass'
import { DataClassAttributes } from '../../types'

export function localStorageOpportunityDataClass(
  attributes: DataClassAttributes,
) {
  return provideLocalStorageDataClass('Opportunity', { attributes })
}
