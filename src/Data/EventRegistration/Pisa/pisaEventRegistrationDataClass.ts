import { provideDataClass } from 'scrivito'
import { pisaConfig } from '../../pisaClient'
import { DataClassAttributes } from '../../types'

export function pisaEventRegistrationDataClass(
  attributes: DataClassAttributes,
) {
  return provideDataClass('EventRegistration', {
    restApi: pisaConfig('event-registration'),
    attributes,
  })
}
